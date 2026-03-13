import Stripe from "stripe";
import Order from "../Models/order.Model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// STRIPE PAYMENT
const processStripePayment = async (req, res) => {
    try {
        const userId = req.decoded_token.id;
        const { orderId, paymentMethodTest } = req.body;

        const order = await Order.findOne({
            _id: orderId,
            userId: userId
        });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.paymentMethod !== "stripe") {
            return res.status(400).json({ message: "This order is not using Stripe payment" });
        }

        if (order.paymentStatus !== "pending") {
            return res.status(400).json({
                message: "Order is not eligible for payment",
                currentStatus: order.paymentStatus
            });
        }

        const amountToCharge = Math.round(order.pricing.total * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountToCharge,
            currency: "egp",
            payment_method_types: ["card"],
            metadata: {
                orderId: order._id.toString(),
                userId: order.userId.toString(),
                promoCode: order.promoCode || "none"
            }
        });

        order.stripePaymentIntentId = paymentIntent.id;
        await order.save();

        let confirmedPayment;

        try {
            confirmedPayment = await stripe.paymentIntents.confirm(
                paymentIntent.id,
                { payment_method: paymentMethodTest || "pm_card_visa" }
            );
        } catch (stripeError) {
            return res.status(400).json({
                message: "Payment Failed",
                stripeError: stripeError.message
            });
        }

        if (confirmedPayment.status === "succeeded") {
            order.paymentStatus = "paid";
            order.status = "confirmed";
            order.stripePaymentId = confirmedPayment.id;

            await order.save();

            return res.status(200).json({
                message: "Payment successful",
                paymentStatus: order.paymentStatus,
                stripePaymentId: confirmedPayment.id,
                order
            });
        }

        return res.status(400).json({
            message: "Payment not completed",
            stripeStatus: confirmedPayment.status
        });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// CASH ON DELIVERY (COD)
const processCODPayment = async (req, res) => {
    try {

        const userId = req.decoded_token.id;
        const { orderId } = req.body;

        const order = await Order.findOne({
            _id: orderId,
            userId: userId
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        if (order.paymentMethod !== "cod") {
            return res.status(400).json({
                message: "This order is not using Cash On Delivery"
            });
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
            message: "Order confirmed with Cash On Delivery",
            paymentStatus: order.paymentStatus,
            order
        });

    } catch (error) {

        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }
};


export { processStripePayment, processCODPayment };