import Order from "../Models/order.Model.js"
import Cart from "../Models/cart.Model.js"
import PromoCode from "../Models/PromoCode.Model.js" // <-- import promo code model

const orderPlacement = async (req, res) => {
    try {
        const userId = req.decoded_token.id;
        const { shippingAddress, paymentMethod, promoCode } = req.body; // <-- added promoCode

        if (!shippingAddress || !paymentMethod) {
            return res.status(400).json({ message: "Shipping address and payment method are required" });
        }

        const cart = await Cart.findOne({ userID: userId }).populate("items.productID");

        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        for (const item of cart.items) {
            if (item.quantity > item.productID.stock) {
                return res.status(400).json({ message: `Not enough stock for product ${item.productID.name}` });
            }
        }

        let discountAmount = 0;
        let appliedPromo = null;

        if (promoCode) {
            const promo = await PromoCode.findOne({ code: promoCode, isActive: true });

            if (!promo) {
                return res.status(400).json({ message: "Invalid or inactive promo code" });
            }

            if (promo.usedBy.includes(userId)) {
                return res.status(400).json({ message: "You have already used this promo code" });
            }

            appliedPromo = promo;
        }

        const orderItems = cart.items.map(item => ({
            productID: item.productID._id,
            productName: item.productID.name,
            images: item.productID.images,
            price: item.productID.price,
            quantity: item.quantity,
            subtotal: item.productID.price * item.quantity
        }));

        const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
        const shippingFee = 20;
        const tax = subtotal * 0.14;
        const totalBeforeDiscount = subtotal + shippingFee + tax;

        if (appliedPromo) {
            discountAmount = (subtotal * appliedPromo.discountPercentage) / 100;

            appliedPromo.usedBy.push(userId);
            await appliedPromo.save();
        }

        const total = totalBeforeDiscount - discountAmount;

        const order = await Order.create({
            userId,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            paymentStatus: "pending",
            pricing: { subtotal, shippingFee, tax, total, discount: discountAmount },
            status: "pending",
            promoCode: appliedPromo ? appliedPromo.code : null
        });

        await Cart.findOneAndDelete({ userID: userId });

        return res.status(201).json({ message: "Order placed successfully", data: order });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getOrders = async (req, res) => {
    try {
        const userId = req.decoded_token.id;

        const orders = await Order.find({ userId });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        return res.status(200).json({ message: "Your Orders:", data: orders });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const userId = req.decoded_token.id;
        const { orderId } = req.params;

        const order = await Order.findOne({
            _id: orderId,
            userId: userId
        });

        if (!order) {
            return res.status(404).json({ message: "No order found" });
        }

        if (order.status === "pending") {
            await Order.findByIdAndDelete(orderId);
            return res.status(200).json({ message: "Order deleted successfully" });
        }

        return res.status(400).json({ message: "Only pending orders can be cancelled" });

    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getOrderByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const userId = req.decoded_token.id;

        const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const orders = await Order.find({ userId: userId, status: status });

        if (orders.length === 0) {
            return res.status(404).json({ message: `No ${status} orders found` });
        }

        return res.status(200).json({ message: "Orders fetched successfully", data: orders });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { orderPlacement, getOrders, deleteOrder, getOrderByStatus }