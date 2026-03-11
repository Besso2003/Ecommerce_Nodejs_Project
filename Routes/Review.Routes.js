import express from "express";
import validateToken from "../MiddleWare/validateToken.js";
import { reviewProduct } from "../Controller/Review.Controller.js";

const reviewRouter = express.Router();

reviewRouter.use(validateToken)


reviewRouter.post("/review-product",reviewProduct)

export default reviewRouter