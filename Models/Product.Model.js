import mongoose from "mongoose";
import Category from "./Category.Model.js";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },

    price: {
        type: Number,
        required: true
    },

    images: [{type: String}],

    stock:{
        type: Number,
        default: 0
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
        required: true
    },

}, {
    timestamps: true
})

const Product = mongoose.model("Product", ProductSchema);

export default Product;