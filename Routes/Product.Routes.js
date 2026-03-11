import express from "express";
import { createProduct, getAllProducts  } from "../Controller/Product.Controller.js";
import validateToken from "../MiddleWare/validateToken.js";

const router = express.Router();
const productRouter = express.Router();

productRouter.get("/", getAllProducts);

router.post("/create", validateToken, createProduct);

export default router;