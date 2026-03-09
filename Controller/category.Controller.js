import Category from "../Models/category.Model.js";

// 1- create Category
export const createCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const category = await Category.create({
            name,
            description,
            image,
        });

        res.status(201).json(category);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 2- Get All Categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// 3- Get Category By ID
export const getCategoryByID = async (req, res) => {
    try{
        const category = await Category.findById(req.params.id);
        if (!category)
        {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    }
    catch(error)
    {
        res.status(500).json({error: error.message});
    }
}