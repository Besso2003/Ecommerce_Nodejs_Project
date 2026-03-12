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


const removeCartItem = async (req, res) => {
    try {
        const userId = req.decoded_token.id;
        const { productId } = req.params;
        let cart = await Cart.findOne({ userID: userId });

        if (!cart) {
            return res.json({ message: "Your Cart Is Empty!" });
        }

        const existingItem = cart.items.find(
            item => item.productID.toString() === productId
        );

        if (existingItem) {
            cart.items = cart.items.filter(
                item => item.productID.toString() !== productId
            );
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        await cart.save();
        res.json({ message: "Product removed successfully", data: cart });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCart = async (req,res) => {
    try {
        const userId = req.decoded_token.id;
        const cart = await Cart.findOne({ userID: userId }).populate("items.productID");
        if(!cart || cart.items.length === 0){
            return res.json({ message: "Your Cart Is Empty!"});
        }

        return res.json({ message: "My Cart", data: cart });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateItemQuantity = async (req, res) => {
    try {
        const userId = req.decoded_token.id;
        const { productId, quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({ message: "Please Enter Valid Quantity" });
        }

        const cart = await Cart.findOne({ userID: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const existingItem = cart.items.find(
            item => item.productID.toString() === productId
        );

        if (!existingItem) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        existingItem.quantity = quantity; 

        await cart.save();

        return res.json({ message: "Quantity updated successfully", data: cart });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const clearCart = async (req,res) => {
    try{
        const userId = req.decoded_token.id;
        await Cart.findOneAndDelete({ userID: userId })
        res.json({ message: "Cart Cleared Successfully!"});
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

export {addToCart, removeCartItem, getCart, updateItemQuantity, clearCart}