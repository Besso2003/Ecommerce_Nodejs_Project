import express from "express";
import { createProduct, getAllProducts , getProductById, updateProduct , deleteProduct  } from "../Controller/Product.Controller.js";
import validateToken from "../MiddleWare/validateToken.js";

const router = express.Router();


router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post("/create", validateToken , createProduct);
router.put("/update/:id", validateToken , updateProduct);
router.delete("/delete/:id", validateToken , deleteProduct);


export default router;