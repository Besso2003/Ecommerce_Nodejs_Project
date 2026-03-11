import Category from "../Models/Category.Model.js"

// 1- create Category
export const createCategory = async (req, res) => {
    try {
        const { role } = req.decoded_token;

        if (role !== "seller" && role !== "admin") {
            return res.status(403).json({ message: "Only sellers or admins can create a category" });
        }

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
};

// 2- Get All Categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
};

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
};

// 4- Update Category
export const updateCategory = async (req, res) => {
    try{
        const { role } = req.decoded_token;

        if (role !== "seller" && role !== "admin") {
            return res.status(403).json({ message: "Only sellers or admins can create a category" });
        }
        const { name, description, image } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {name, description, image},
            {new: true}
        );

        if(!updatedCategory)
        {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(updatedCategory);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
};

// 5- Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const { role } = req.decoded_token;

        if (role !== "seller" && role !== "admin") {
            return res.status(403).json({ message: "Only sellers or admins can create a category" });
        }
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};