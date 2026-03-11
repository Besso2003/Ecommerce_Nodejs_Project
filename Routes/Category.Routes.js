import { Router } from "express";
const router = Router();

import {
    createCategory,
    getAllCategories,
    getCategoryByID,
    updateCategory,
    deleteCategory
} from "../Controller/Category.Controller.js"

import validateToken from "../MiddleWare/validateToken.js";

router.post("/", validateToken, createCategory);
router.get("/",getAllCategories);
router.get("/:id", validateToken,getCategoryByID);
router.put("/:id", validateToken,updateCategory);
router.delete("/:id", validateToken,deleteCategory);

export default router;