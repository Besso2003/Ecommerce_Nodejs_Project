import express from "express";

import validateToken from "../MiddleWare/validateToken.js";
import validate  from "../MiddleWare/validateSchema.js";

import { createProductSchema, updateProductSchema, updateStockSchema } from "../Validation/productValidations.js";

import { createProduct, 
        getAllProducts , 
        getProductById, 
        updateProduct , 
        deleteProduct, 
        getPendingProducts, 
        approveProduct, 
        rejectProduct , 
        updateStock }
 from "../Controller/Product.Controller.js";


const router = express.Router();

// Static
router.get("/pending", validateToken, getPendingProducts);        
router.patch("/:id/approve", validateToken, approveProduct);      
router.patch("/:id/reject", validateToken, rejectProduct);       

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post("/create", validateToken , validate(createProductSchema) ,createProduct);
router.put("/update/:id", validateToken ,validate(updateProductSchema) , updateProduct);
router.delete("/delete/:id", validateToken , deleteProduct);
router.patch("/:id/stock", validateToken, validate(updateStockSchema), updateStock);


export default router;