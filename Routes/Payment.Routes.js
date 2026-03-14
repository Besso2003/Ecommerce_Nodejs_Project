import express from "express";
import { processStripePayment, processCODPayment } from "../Controller/Payment.Controller.js";
import validateToken from "../MiddleWare/validateToken.js";

const paymentRouter = express.Router();

paymentRouter.post("/stripe", validateToken, processStripePayment);
paymentRouter.post("/cod", validateToken, processCODPayment);

export default paymentRouter;