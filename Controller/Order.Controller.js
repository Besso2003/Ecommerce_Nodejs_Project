import Order from "../Models/order.Model.js"
import Cart from "../Models/cart.Model.js"

const orderPlacment = async (req, res) => {
    try {
        const userId = req.decoded_token.id;
        const { shippingAddress, paymentMethod } = req.body;

        const cart = await Cart.findOne({ userID: userId }).populate("items.productID");

        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        for (const item of cart.items) {
            if (item.quantity > item.productID.stock) {
                return res.status(400).json({ message: `Not enough stock for product ${item.productID.name}` });
            }
        }

        const orderItems = cart.items.map(item => ({
            productId: item.productID._id,
            productName: item.productID.name,
            images: item.productID.images,
            price: item.productID.price,
            quantity: item.quantity,
            subtotal: item.productID.price * item.quantity
        }));

        const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
        const shippingFee = 20;
        const tax = subtotal * 0.14;
        const total = subtotal + shippingFee + tax;

        const order = await Order.create({
            userId,
            items: orderItems,
            shippingAddress,
            pricing: { subtotal, shippingFee, tax, total },
            status: "pending"
        });

        await Cart.findOneAndDelete({ userID: userId });

        return res.status(201).json({ message: "Order placed successfully", data: order });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { orderPlacment }