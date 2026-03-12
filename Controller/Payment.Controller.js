import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const StripePayment = async (req, res) => {
    try {

        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({
                message: "Amount is required"
            });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "egp",
            payment_method_types: ["card"],
        });

        res.status(200).json({
            message: "Payment Intent created successfully",
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Payment Failed",
            error: error.message
        });
    }
};