import Product from "../Models/Product.Model.js";

// 1- Create Product
export const createProduct = async (req, res) => {
    try {
        const { role } = req.decoded_token;

        if (role !== "seller" && role !== "admin") {
            return res.status(403).json({ message: "Only sellers or admins can create a product" });
        }
        // Extract Query Parameters
        const { name, description, price, images, stock, category } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            images,
            stock,
            category,
        });

        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2- Get All Products + Search & Filter 
// api/products
// query params:
// ?search=name
// ?category=catID
// ?minPrice
// ?maxPrice
// ?stock=num
// ?sortBy -> price_asc, price_desc, newest ,oldest

export const getAllProducts = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, stock, sort, page = 1, limit = 10 } = req.query;

        const filter = {};

        // search by name insenstive
        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        // filter by category
        if (category) {
            filter.category = category;
        }

        // filter by price range
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        // filter by stock
        if (stock) {
            filter.stock = { $gte: Number(stock) };
        }

        const sortOptions = {
            price_asc: { price: 1 },
            price_desc: { price: -1 },
            newest: { createdAt: -1 },
            oldest: { createdAt: 1 }
        }

        const sortBy = sortOptions[sort] || { createdAt: -1 };
    

        const products = await Product.find(filter)
        .populate("category", "name description")
        .sort(sortBy)
        .skip((page - 1) * limit)
        .limit(Number(limit));
        res.status(200).json({ count: products.length, data: products });

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 3- Get product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category", "name description");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 4- Update Product
export const updateProduct = async (req, res) => {
    try {
        const { role } = req.decoded_token;

        if (role !== "seller" && role !== "admin") {
            return res.status(403).json({ message: "Only sellers or admins can update a product" });
        }
        const { name, description, price, images, stock, category } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, images, stock, category },
            { new: true, runValidators: true }
        ).populate("category", "name");

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    }
     catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//5- Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const { role } = req.decoded_token;
 
        if (role !== "seller" && role !== "admin") {
            return res.status(403).json({ message: "Only sellers or admins can delete a product" });
        }
 
        const deleted = await Product.findByIdAndDelete(req.params.id);
 
        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }
 
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}