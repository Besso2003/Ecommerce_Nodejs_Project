import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    images: [{ type: String }]
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    
    guestInfo: {
        name: { type: String },
        email: { type: String },
        phone: { type: String }
    },

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

    // paymentMethod: {
    //     type: String,
    //     enum: ["stripe", "paypal", "cod", "wallet"],
    //     required: true
    // },

    // paymentStatus: {
    //     type: String,
    //     enum: ["pending", "paid", "failed"],
    //     default: "pending"
    // }

    // paymentMethod: {
    //     type: String,
    //     enum: ["stripe", "paypal", "cod", "wallet"],
    //     required: true
    // },

    // paymentStatus: {
    //     type: String,
    //     enum: ["pending", "paid", "failed"],
    //     default: "pending"
    // }

    // paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" }

}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;