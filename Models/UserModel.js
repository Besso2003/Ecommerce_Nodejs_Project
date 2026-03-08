import mongoose, { Schema, model } from "mongoose";


//  validation --> frontend(JS) -> validation(nodejs) --> validation(mongodb)
const userSchema = new Schema({
    name:{
        type: String,
        minlength: 3, 
        maxlength: 10
    },
    email: {
        type: String,
        unique: true
    }, 
    password: {
        type: String,
        required: true 
    },
    age: {
        type: Number,
        min: 20,
        max: 50
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["customer", "admin", "seller"],
        default: "customer"
    }
},{
    timestamps: true, // 2 columns : createdAt, updatedAt
    versionKey: false // __v
})

const userModel = model("User", userSchema); // i wanna create table its name User and its schema is userschema and return it in userModel

export default userModel