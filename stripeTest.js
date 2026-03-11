import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function testStripe() {
    try {
        const paymentIntents = await stripe.paymentIntents.list({ limit: 1 });
        console.log("Stripe keys are working. Here are test output:");
        console.log(paymentIntents);
    } catch (error) {
        console.error("Error testing Stripe keys:", error.message);
    }
}

testStripe();