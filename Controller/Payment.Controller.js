// import Stripe from "stripe";
// import Order from "../Models/order.Model.js";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const processPayment = async (req, res) => {
//     try {
//         const userId = req.decoded_token.id;
//         const { orderId } = req.body;

//         // 1. Find the order
//         const order = await Order.findOne({
//             _id: orderId,
//             userId: userId
//         });

//         if (!order) {
//             return res.status(404).json({ message: "Order Not Found!" });
//         }

//         if (order.paymentStatus === "paid") {
//             return res.status(400).json({ message: "Order Already Paid!" });
//         }

//         // 2. Handle Stripe payment
//         if (order.paymentMethod === "stripe") {
//             const paymentIntent = await stripe.paymentIntents.create({
//                 amount: Math.round(order.pricing.total * 100), // in cents
//                 currency: "egp",
//                 payment_method_types: ["card"],  // only allow cards for now
//                 metadata: {
//                     orderId: order._id.toString(),
//                     userId: order.userId.toString()
//                 }
//             });

//             // 3. Return client_secret to the client
//             return res.status(200).json({
//                 message: "Stripe Payment Intent Created",
//                 clientSecret: paymentIntent.client_secret
//             });
//         }

//         // 4. Cash on Delivery (COD)
//         if (order.paymentMethod === "cod") {
//             order.paymentStatus = "pending";
//             order.status = "confirmed";
//             await order.save();

//             return res.status(200).json({
//                 message: "Order confirmed with Cash On Delivery",
//                 data: order
//             });
//         }

//         return res.status(400).json({ message: "Invalid Payment Method!" });

//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export { processPayment };



import Stripe from "stripe";
import Order from "../Models/order.Model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const processPayment = async (req, res) => {
    try {
        const userId = req.decoded_token.id;
        const { orderId } = req.body;

        const order = await Order.findOne({
            _id: orderId,
            userId: userId
        });

        if (!order) {
            return res.status(404).json({ message: "Order Not Found!" });
        }

        if (order.paymentStatus === "paid") {
            return res.status(400).json({ message: "Order Already Paid!" });
        }

        // Stripe payment
        if (order.paymentMethod === "stripe") {

            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(order.pricing.total * 100),
                currency: "egp",
                payment_method_types: ["card"],
                metadata: {
                    orderId: order._id.toString(),
                    userId: order.userId.toString()
                }
            });

            const confirmedPayment = await stripe.paymentIntents.confirm(
                paymentIntent.id,
                { payment_method: "pm_card_visa" }
            );

            
            order.paymentStatus = "paid";
            order.status = "confirmed";
            order.stripePaymentId = confirmedPayment.id;
            await order.save();

            return res.status(200).json({
                message: "Payment successful",
                paymentStatus: order.paymentStatus,
                order: order
            });
        }

        // Cash on Delivery (COD)
        if (order.paymentMethod === "cod") {
            order.paymentStatus = "pending";
            order.status = "confirmed";
            await order.save();

            return res.status(200).json({
                message: "Order confirmed with Cash On Delivery",
                data: order
            });
        }

        return res.status(400).json({ message: "Invalid Payment Method!" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export { processPayment };