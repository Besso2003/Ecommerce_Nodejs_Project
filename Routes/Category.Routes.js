import { Router } from "express";
import validateToken from "../MiddleWare/validateToken.js";
const router = Router();

import {
    createCategory,
    getAllCategories,
    getCategoryByID,
    updateCategory,
    deleteCategory,
    getPendingCategories,
    approveCategory,
    rejectCategory
} from "../Controller/Category.Controller.js"

// static
router.get("/pending", validateToken, getPendingCategories);
router.patch("/:id/approve", validateToken, approveCategory);
router.patch("/:id/reject", validateToken, rejectCategory); 

router.post("/", validateToken, createCategory);
router.get("/",getAllCategories);
router.get("/:id", validateToken,getCategoryByID);
router.put("/:id", validateToken,updateCategory);
router.delete("/:id", validateToken,deleteCategory);



export default router;