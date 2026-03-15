import express from "express";
import { createProduct, getAllProducts , getProductById, updateProduct , deleteProduct , getPendingProducts, approveProduct, rejectProduct } from "../Controller/Product.Controller.js";
import validateToken from "../MiddleWare/validateToken.js";

const router = express.Router();

// Static
router.get("/pending", validateToken, getPendingProducts);        
router.patch("/:id/approve", validateToken, approveProduct);      
router.patch("/:id/reject", validateToken, rejectProduct);       

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post("/create", validateToken , createProduct);
router.put("/update/:id", validateToken , updateProduct);
router.delete("/delete/:id", validateToken , deleteProduct);


export default router;