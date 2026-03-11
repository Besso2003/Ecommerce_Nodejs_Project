import Product from "../Models/Product.Model.js";

// 1- Create Product
export const createProduct = async (req, res) => {
    try {
        const { role } = req.decoded_token;

        if (role !== "seller" && role !== "admin") {
            return res.status(403).json({ message: "Only sellers or admins can create a product" });
        }

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

export const getAllProducts = async (req, res) => {
    try{
        const {search, category, minPrice, maxPrice, stock} = req.query;

        const filter = {};

        // search by name
        if (search)
        {
            filter.name = {$regex: search, $option: "i"};
        }

        // filter by category
        if (category) {
            filter.category = category;
        }

        // filter by price range
        if (minPrice || maxPrice)
        {
            filter.price = {};
            if(minPrice)
            {
                filter.price.$gte = Number(minPrice);
                filter.price.$lte = Number(maxPrice);
            }
        }

        // filter by stock
        if (stock) {
            filter.stock = { $gte: Number(minStock) };
        }

        const products = await Product.find(filter).populate("category", "name description");
        res.status(200).json({count: products.length, data: products});


    }
    catch(error)
    {
        res.status(500).json({ error: error.message });
    }
}
