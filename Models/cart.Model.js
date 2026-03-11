import mongoose from "mongoose";
import Product from "./product.Model.js";
import User from "./UserModel.js"
const CartItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
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
        ref: User,
        required: true
    },
    items: [
        CartItemSchema
    ]
}, { timestamps: true });

const Cart = mongoose.Model("Cart", CartSchema)

export default Cart