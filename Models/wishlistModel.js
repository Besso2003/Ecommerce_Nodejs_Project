import mongoose, { Schema, model } from "mongoose";


const wishlistSchema = new mongoose.Schema({
    userID: { // here before adding items check the user is customer 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            
        }
    ]
    
},{
    timestamps: true, // 2 columns : createdAt, updatedAt
    versionKey: false // __v
})

let wishlistModel = model("Wishlist", wishlistSchema)

export default wishlistModel