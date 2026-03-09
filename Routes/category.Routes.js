import { Router } from "express";
const router = Router();

import {
    createCategory,
    getAllCategories,
    getCategoryByID
} from "../Controller/category.Controller.js";


router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryByID);

export default router;