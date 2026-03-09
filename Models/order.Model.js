import mongoose from "mongoose";
import Product from "./product.Model.js";
import User from "./UserModel.js"

const orderItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
         min: 1
    },
    productName: { 
        type: String,
        required: true 
    },
    price: { 
        type: Number,
        required: true 
    },  
    description: {
        type: String,
    },
    images: [{type: String}],
});

const orderSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    items: [orderItemSchema],

    shippingAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String },
        zipCode: { type: String },
        country: { type: String, required: true }
    },

    pricing: {
        subtotal: { type: Number, required: true },
        shippingFee: { type: Number, default: 0 },
        tax: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        total: { type: Number, required: true }
    },

    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending"
    },

    // paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" } // to be implemented by bassant

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);