import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending" , "approved", "rejected"],
        default: "pending"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    // cratedAt, updatedAt
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema);

export default Category;