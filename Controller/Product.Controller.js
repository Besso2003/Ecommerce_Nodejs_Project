import Product from "../Models/Product.Model.js";
import Category from "../Models/Category.Model.js"

// 1- Create Product (Seller or Admin)
// - Seller can use ANY approved category
// - Admin: auto approved
// - Seller: pending until admin approves
export const createProduct = async (req, res) => {
    try {
        const { role, id: userId } = req.decoded_token;
 
        if (role !== "seller" && role !== "admin") {
            return res.status(403).json({ message: "Only sellers or admins can create a product" });
        }
 
        const { name, description, price, images, stock, category } = req.body;
 
        // Validate category exists and is approved
        const existingCategory = await Category.findById(category);
        if (!existingCategory || existingCategory.status !== "approved") {
            return res.status(400).json({ message: "Invalid or unapproved category" });
        }
 
        const product = await Product.create({
            name,
            description,
            price,
            images,
            stock,
            category,
            seller: userId,
            status: role === "admin" ? "approved" : "pending"
        });
 
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 

// 2- Get All Products + Search & Filter
// - Admins see all products (any status)
// - Customer else only sees approved products
// - Seller see approved + his own pending and rejected
// query params:
// ?search=name
// ?category=catID
// ?minPrice, ?maxPrice
// ?stock=num
// ?sort -> price_asc, price_desc, newest, oldest
// ?status=pending 
export const getAllProducts = async (req, res) => {
    try {
        const role = req.decoded_token?.role;
        const userId = req.decoded_token?.id;
        const { search, category, minPrice, maxPrice, stock, sort, status, page = 1, limit = 10 } = req.query;

        const filter = {};

        if (role === "admin") {
            // Admin sees everything, optionally filter by status
            if (status) filter.status = status;
        } else if (role === "seller") {
           if (status) {
        // Seller filters by specific status
        if (status === "approved") {
            // All approved products
            filter.status = "approved";
        } else if (status === "pending" || status === "rejected") {
            // Only their own pending/rejected
            filter.status = status;
            filter.seller = userId;
        }
    } else {
        // No status filter — seller sees all approved + their own pending/rejected
        filter.$or = [
            { status: "approved" },
            { seller: userId }
        ];
    }
        } else {
            // Customer or guest sees only approved
            filter.status = "approved";
        }

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        if (stock) {
            filter.stock = { $gte: Number(stock) };
        }

        const sortOptions = {
            price_asc: { price: 1 },
            price_desc: { price: -1 },
            newest: { createdAt: -1 },
            oldest: { createdAt: 1 }
        };

        const sortBy = sortOptions[sort] || { createdAt: -1 };

        const products = await Product.find(filter)
            .populate("category", "name description")
            .populate("seller", "name email")
            .sort(sortBy)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).json({ count: products.length, data: products });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 3- Get Product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category", "name description")
            .populate("seller", "name email");
 
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
 
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4- Update Product
// - Seller can only update their own pending or rejected product
// - When seller updates: resets to pending
// - Admin can update any product regardless of status
export const updateProduct = async (req, res) => {
    try {
        const { role, id: userId } = req.decoded_token;
 
        if (role !== "seller" && role !== "admin") {
            return res.status(403).json({ message: "Only sellers or admins can update a product" });
        }
 
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
 
        // Seller can only update their own product
        if (role === "seller" && product.seller.toString() !== userId) {
            return res.status(403).json({ message: "You can only update your own products" });
        }
 
        // Seller cannot edit an already approved product
        if (role === "seller" && product.status === "approved") {
            return res.status(403).json({ message: "Cannot edit an approved product" });
        }
 
        // If category is being changed, validate it's approved
        if (req.body.category) {
            const existingCategory = await Category.findById(req.body.category);
            if (!existingCategory || existingCategory.status !== "approved") {
                return res.status(400).json({ message: "Invalid or unapproved category" });
            }
        }
 
        const { name, description, price, images, stock, category } = req.body;
 
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name, description, price, images, stock, category,
                // Reset to pending if seller edits
                ...(role === "seller" && { status: "pending" })
            },
            { new: true, runValidators: true }
        ).populate("category", "name");
 
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 
// 5- Delete Product
// - Seller can only delete their own pending or rejected product
// - Admin can delete any product
export const deleteProduct = async (req, res) => {
    try {
        const { role, id: userId } = req.decoded_token;
 
        if (role !== "seller" && role !== "admin") {
            return res.status(403).json({ message: "Only sellers or admins can delete a product" });
        }
 
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
 
        // Seller can only delete their own product
        if (role === "seller" && product.seller.toString() !== userId) {
            return res.status(403).json({ message: "You can only delete your own products" });
        }
 
        // Seller cannot delete an approved product
        if (role === "seller" && product.status === "approved") {
            return res.status(403).json({ message: "Cannot delete an approved product, contact admin" });
        }
 
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 
// 6- Get Pending Products (Admin only)
export const getPendingProducts = async (req, res) => {
    try {
        const { role } = req.decoded_token;
 
        if (role !== "admin") {
            return res.status(403).json({ message: "Only admins can view pending products" });
        }
 
        const products = await Product.find({ status: "pending" })
            .populate("category", "name")
            .populate("seller", "name email");
 
        res.status(200).json({ count: products.length, data: products });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 
// 7- Approve Product (Admin only)
export const approveProduct = async (req, res) => {
    try {
        const { role } = req.decoded_token;
 
        if (role !== "admin") {
            return res.status(403).json({ message: "Only admins can approve products" });
        }
 
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { status: "approved" },
            { new: true }
        );
 
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
 
        res.status(200).json({ message: "Product approved", product });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 
// 8- Reject Product (Admin only)
export const rejectProduct = async (req, res) => {
    try {
        const { role } = req.decoded_token;
 
        if (role !== "admin") {
            return res.status(403).json({ message: "Only admins can reject products" });
        }
 
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { status: "rejected" },
            { new: true }
        );
 
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
 
        res.status(200).json({ message: "Product rejected", product });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 
// 9- Update Stock (Seller owns product or Admin)
export const updateStock = async (req, res) => {
    try {
        const role = req.decoded_token?.role;
        const userId = req.decoded_token?.id;

        if (role !== "seller" && role !== "admin") {
            return res.status(403).json({ message: "Only sellers or admins can update stock" });
        }

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Seller can only update stock of their own product
        if (role === "seller" && product.seller.toString() !== userId) {
            return res.status(403).json({ message: "You can only update stock of your own products" });
        }

        // Seller can only update stock of approved products
        if (role === "seller" && product.status !== "approved") {
            return res.status(403).json({ message: "Cannot update stock of a non-approved product" });
        }

        const { stock } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                stock,
                isAvailable: stock > 0  // auto mark unavailable if stock hits 0
            },
            { new: true }
        );

        res.status(200).json({
            message: stock === 0 ? "Product is now out of stock" : "Stock updated successfully",
            product: updatedProduct
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};