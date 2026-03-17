import express from "express";
import { stripeWebhook } from "../Controller/Payment.Controller.js";

const webhookRouter = express.Router();

webhookRouter.post(
  "/webhook",
  express.raw({ type: 'application/json' }),
  (req, res, next) => {
    req.rawBody = req.body;
    next();
  },
  stripeWebhook
);

export default webhookRouter;