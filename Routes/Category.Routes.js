import { Router } from "express";
import validateToken from "../MiddleWare/validateToken.js";
import validate from "../MiddleWare/validateSchema.js"

import { createCategorySchema, updateCategorySchema } from "../Validation/categoryValidation.js";
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


router.get("/pending", validateToken, getPendingCategories);
router.patch("/:id/approve", validateToken, approveCategory);
router.patch("/:id/reject", validateToken, rejectCategory); 

router.post("/", validateToken, validate(createCategorySchema), createCategory);
router.get("/",getAllCategories);
router.get("/:id", validateToken,getCategoryByID);
router.put("/:id", validateToken, validate(updateCategorySchema) , updateCategory);
router.delete("/:id", validateToken,deleteCategory);



export default router;