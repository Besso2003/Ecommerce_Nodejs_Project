import express from "express";
import validateToken from "../MiddleWare/validateToken.js";
import { deleteReview, getProductReview, reviewProduct, updateReview } from "../Controller/Review.Controller.js";

const reviewRouter = express.Router();

reviewRouter.use(validateToken)

reviewRouter.post("/review-product",reviewProduct)
reviewRouter.put("/update-review",updateReview)
reviewRouter.delete("/delete-review",deleteReview)
reviewRouter.get("/get-reviews",getProductReview)


export default reviewRouter