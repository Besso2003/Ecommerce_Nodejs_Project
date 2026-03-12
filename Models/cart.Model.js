import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const CartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [CartItemSchema]
}, { timestamps: true });

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;