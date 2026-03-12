import Cart from "../Models/cart.Model.js"

const addToCart = async (req, res) => {
    try {
        const userId = req.decoded_token.id;
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ userID: userId });

        if (!cart) {
            cart = await Cart.create({
                userID: userId,
                items: [{ productID: productId, quantity }]
            });
        } 
        else {
            const existingItem = cart.items.find(
                item => item.productID.toString() === productId
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productID: productId, quantity });
            }

            await cart.save();
        }

        res.json({ message: "product added successfully", data: cart });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const removeCartItem = async (req,res) => {
    
}

const getCart = async (req,res) => {
    try {
        const userId = req.decoded_token.id;
        const cart = await Cart.findOne({ userID: userId }).populate("items.productID");
        if(!cart || cart.items.length === 0){
            res.json({ message: "Your Cart Is Empty!"});
        }

        res.json({ message: "My Cart", data: cart });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCart = async (req,res) => {
    
}

const clearCart = async (req,res) => {
    
}

export {addToCart, removeCartItem, getCart, updateCart, clearCart}