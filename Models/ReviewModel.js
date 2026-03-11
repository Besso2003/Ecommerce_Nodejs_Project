import mongoose, { Schema, model } from "mongoose";

const reviewSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true, // 2 columns : createdAt, updatedAt
    versionKey: false // __v
})
reviewSchema.index({ userID: 1, productID: 1 }, { unique: true }) //composite index(composite pk ) 

let reviewModel = model("Review", reviewSchema)
export default reviewModel
