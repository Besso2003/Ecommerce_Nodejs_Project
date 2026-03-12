import express from "express";
import { StripePayment } from "../Controller/Payment.Controller.js";

let paymentRouter = express.Router();

paymentRouter.post("/stripe", StripePayment);

export default paymentRouter;