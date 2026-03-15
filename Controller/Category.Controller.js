import Category from "../Models/Category.Model.js"

// 1- Create Category (Admin or Seller)
// Admin → auto approved
// Seller → pending until admin approves
export const createCategory = async (req, res) => {
    try {
        const { role, id: userId } = req.decoded_token;
 
        if (role !== "seller" && role !== "admin") {
            return res.status(403).json({ message: "Only sellers or admins can create a category" });
        }
 
        const { name, description, image } = req.body;
        const category = await Category.create({
            name,
            description,
            image,
            createdBy: userId,
            status: role === "admin" ? "approved" : "pending"
        });
 
        res.status(201).json(category);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2- Get All Categories
// - Admins see all categories (any status)
// - Everyone else only sees approved categories
export const getAllCategories = async (req, res) => {
    try {
        const { role } = req.decoded_token || {};
 
        
 
        const categories = await Category.find().populate("createdBy", "name email");
        res.json({count: categories.length, data: categories});
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
};
 

// 3- Get Category By ID
export const getCategoryByID = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate("createdBy", "name email");
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4- Update Category 
// Seller -> Update it own pending - rejected Category 
// Admin -> will approve or reject it
export const updateCategory = async (req, res) => {
    try {
        const { role, id: userId } = req.decoded_token;

        if (role !== "seller" && role !== "admin") {
            return res.status(403).json({ message: "Only sellers or admins can update a category" });
        }

        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Seller can only update their own category
        if (role === "seller" && category.createdBy.toString() !== userId) {
            return res.status(403).json({ message: "You can only update your own categories" });
        }

        // Seller cannot edit an already approved category
        if (role === "seller" && category.status === "approved") {
            return res.status(403).json({ message: "Cannot edit an approved category, contact admin" });
        }

        const { name, description, image } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name, description, image,
                // Reset to pending if seller edits
                ...(role === "seller" && { status: "pending" })
            },
            { new: true }
        );

        res.json(updatedCategory);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5- Delete Category -> Admins Only
export const deleteCategory = async (req, res) => {
    try {
        const { role, id: userId } = req.decoded_token;

        if (role !== "seller" && role !== "admin") {
            return res.status(403).json({ message: "Only sellers or admins can delete a category" });
        }

        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Seller can only delete their own category
        if (role === "seller" && category.createdBy.toString() !== userId) {
            return res.status(403).json({ message: "You can only delete your own categories" });
        }

        // Seller cannot delete an approved category
        if (role === "seller" && category.status === "approved") {
            return res.status(403).json({ message: "Cannot delete an approved category, contact admin" });
        }

        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Category deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 6- Get Pending Categories -> Admin only
export const getPendingCategories = async (req, res) => {
    try {
        const { role } = req.decoded_token;

        if (role !== "admin") {
            return res.status(403).json({ message: "Only admins can view pending categories" });
        }

        const categories = await Category.find({ status: "pending" })
            .populate("createdBy", "name email");

        res.json({ count: categories.length, data: categories });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 7- Approve Category -> Admin only
export const approveCategory = async (req, res) => {
    try {
        const {role} = req.decoded_token;
        if (role !== "admin")
        {
             return res.status(403).json({ message: "Only admins can approve categories" });
        }
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {status: "approved"},
            {new: true}
        );

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

         res.json({ message: "Category approved", category });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 8- Reject Category -> Admin only
export const rejectCategory = async (req, res) => {
    try {
        const { role } = req.decoded_token;
 
        if (role !== "admin") {
            return res.status(403).json({ message: "Only admins can reject categories" });
        }
 
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { status: "rejected" },
            { new: true }
        );
 
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
 
        res.json({ message: "Category rejected", category });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 