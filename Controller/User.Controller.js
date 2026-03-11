import { sendEmail } from "../Email/email.js"
import UserModel from "../Models/UserModel.js"
import jwt, { decode } from "jsonwebtoken"
import bcrypt from "bcrypt"
import userModel from "../Models/UserModel.js"
import Product from "../Models/Product.Model.js"
import wishlistModel from "../Models/wishlistModel.js"

//should hide password (done), check email is unique , hash password, send confirmation email,do backend validatoin
let register = async (req, res) => {
    let addedUser = await UserModel.insertOne(req.body)

    sendEmail(req.body.email)
    addedUser.password = undefined
    res.json({
        message: "user registered successfully",
        warn: "check your email to confirm your account",
        data: addedUser
    })
}

let verifyAccount = async (req, res) => {
    jwt.verify(req.params.emailtoken, "secret", async (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: "invalid token" })
        }
        // return decoded
        await UserModel.findOneAndUpdate({ email: decoded }, { isConfirmed: true })
        res.status(200).json({ message: "account verified successfully" })
    })
}

//login ,generate token
let login = async (req, res) => {//need to check email in middlewareexist the check password then generate token 

    let matchedPassword = bcrypt.compare(req.body.password, req.foundUser.password)

    if (matchedPassword) {
        if (req.foundUser.isRestricted == true) {
            res.status(400).json({ message: "user is restricted contact the admin " })
        }
        else {
            let token = jwt.sign({ email: req.foundUser.email, role: req.foundUser.role, id: req.foundUser._id }, "secret")
            res.json({ message: "login successfully", token: token, data: req.foundUser })
        }
    }
}

// this must send token 
let updateProfile = async (req, res) => {

    let updatedUser = await UserModel.findOneAndUpdate({ _id: req.decoded_token.id }, req.body, { returnDocument: 'after' })
    if (updatedUser)
        res.json({ message: "profile updated successfully", data: updatedUser })
    else
        res.status(400).json({ message: "user not found" })
}

let addProductToWishlist = async (req, res) => {
    // i will check if the user is customer , so take its token and check its role 
    // if customer call model of wishlist and add the product into it with id of the user from token and product id from params/body 
    if (req.decoded_token.role != "customer")
        return res.status(400).json({ message: "only customer can add product to wishlist" })
    let product = await Product.findById(req.body.productID)
    if (!product)
        return res.status(400).json({ message: "product not found" })

    // want to check if the wish list have that product before don't added it 
    let userwishlist = await wishlistModel.findOne({ userID: req.decoded_token.id })

    if (userwishlist && userwishlist.items.includes(req.body.productID))
        return res.status(400).json({ message: "product already exists in wishlist" })


    let wishlist = await wishlistModel.findOneAndUpdate({ userID: req.decoded_token.id }, { $addToSet: { items: product._id } }, { upsert: true, returnDocument: 'after' })

    if (!wishlist)
        return res.status(400).json({ message: "product not added to wishlist" })

    res.json({ message: "product added to wishlist successfully", data: wishlist },)

}

export { register, verifyAccount, login, updateProfile, addProductToWishlist }