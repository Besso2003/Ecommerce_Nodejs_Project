import express from "express";
import { processPayment } from "../Controller/Payment.Controller.js";
import validateToken from "../MiddleWare/validateToken.js";

let paymentRouter = express.Router();

paymentRouter.post("/process", validateToken, processPayment);

export default paymentRouter;