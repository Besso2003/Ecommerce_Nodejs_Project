import Stripe from "stripe";
import Order from "../Models/order.Model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// STRIPE PAYMENT
const processStripePayment = async (req, res) => {
    try {
        const userId = req.decoded_token.id;
        const { orderId, paymentMethodTest } = req.body;

        const order = await Order.findOne({ _id: orderId, userId });
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (order.paymentMethod !== "stripe") {
            return res.status(400).json({ message: "This order is not using Stripe payment" });
        }

        if (!["pending", "failed"].includes(order.paymentStatus)) {
            return res.status(400).json({
                message: "Order is not eligible for payment",
                currentStatus: order.paymentStatus
            });
        }

        if (order.paymentStatus === "failed") {
            order.stripePaymentIntentId = null;
            order.paymentStatus = "pending";
            await order.save();
        }

        const amountToCharge = Math.round(order.pricing.total * 100);

        const paymentIntent = await stripe.paymentIntents.create(
            {
                amount: amountToCharge,
                currency: "egp",
                payment_method_types: ["card"],
                metadata: {
                    orderId: order._id.toString(),
                    userId: order.userId.toString(),
                    promoCode: order.promoCode || "none"
                }
            },
            { idempotencyKey: `order_${order._id}_${Date.now()}` }
        );

        order.stripePaymentIntentId = paymentIntent.id;
        await order.save();

        let confirmedPayment;
        try {
            confirmedPayment = await stripe.paymentIntents.confirm(
                paymentIntent.id,
                { payment_method: paymentMethodTest || "pm_card_visa" }
            );
        } catch (stripeError) {
            order.paymentStatus = "failed";
            await order.save();

            return res.status(400).json({
                message: "Payment failed",
                error: stripeError.message,
                code: stripeError.code
            });
        }

        if (confirmedPayment.status === "succeeded") {
            order.paymentStatus = "paid";
            order.status = "confirmed";
            order.stripePaymentId = confirmedPayment.id;
            await order.save();

            return res.status(200).json({
                success: true,
                message: "Payment successful",
                paymentId: confirmedPayment.id,
                orderId: order._id,
                paymentStatus: order.paymentStatus
            });
        }

        order.paymentStatus = "failed";
        await order.save();
        return res.status(400).json({
            message: "Payment not completed",
            stripeStatus: confirmedPayment.status
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// CASH ON DELIVERY
const processCODPayment = async (req, res) => {
    try {
        const userId = req.decoded_token.id;
        const { orderId } = req.body;

        const order = await Order.findOne({ _id: orderId, userId });
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (order.paymentMethod !== "cod") {
            return res.status(400).json({ message: "This order is not using Cash On Delivery" });
        }

        if (order.paymentStatus !== "pending") {
            return res.status(400).json({
                message: "Order already processed",
                currentStatus: order.paymentStatus
            });
        }

        order.status = "confirmed";
        order.paymentStatus = "pending";
        order.promoCode = order.promoCode || null;

        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order confirmed with Cash On Delivery",
            orderId: order._id,
            paymentStatus: order.paymentStatus
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// STRIPE WEBHOOK
const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'payment_intent.created': {
            const paymentIntent = event.data.object;
            console.log(`PaymentIntent created: ${paymentIntent.id}, for order ${paymentIntent.metadata.orderId}`);
            break;
        }

        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object;
            const order = await Order.findById(paymentIntent.metadata.orderId);
            if (!order) break;

            if (order.paymentStatus !== "paid") {
                order.paymentStatus = "paid";
                order.status = "confirmed";
                order.stripePaymentId = paymentIntent.id;
                await order.save();
            }
            break;
        }

        case 'payment_intent.payment_failed': {
            const failedIntent = event.data.object;
            try {
                const order = await Order.findById(failedIntent.metadata.orderId);
                if (!order) break;

                order.paymentStatus = "failed";
                await order.save();
            } catch (err) {
                console.error("Error updating failed order from webhook:", err.message);
            }
            break;
        }

        case 'charge.succeeded': {
            const charge = event.data.object;
            console.log(`Charge succeeded for PaymentIntent ${charge.payment_intent}`);
            break;
        }

        case 'charge.failed': {
            const charge = event.data.object;
            console.log(`Charge failed for PaymentIntent ${charge.payment_intent}`);
            break;
        }

        case 'charge.updated': {
            const charge = event.data.object;
            console.log(`Charge updated for PaymentIntent ${charge.payment_intent}, status: ${charge.status}`);
            break;
        }

        default:
            console.log(`Unhandled event type ${event.type}`);
            break;
    }

    res.status(200).send({ received: true });
};

export { processStripePayment, processCODPayment, stripeWebhook };