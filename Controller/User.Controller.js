import { sendEmail } from "../Email/email.js"
import UserModel from "../Models/UserModel.js"
import jwt, { decode } from "jsonwebtoken"
import bcrypt from "bcrypt"
import { template } from "../Email/emailTemplate.js"
import userModel from "../Models/UserModel.js"
import Product from "../Models/Product.Model.js"
import wishlistModel from "../Models/wishlistModel.js"
import reviewModel from "../Models/ReviewModel.js"

//should hide password (done), check email is unique , hash password, send confirmation email,do backend validatoin
let register = async (req, res) => {
    let addedUser = await UserModel.insertOne(req.body)
    const tokenedEmail = jwt.sign(req.body.email, "secret");
    sendEmail(
        req.body.email,
        "Confirm Your Account",
        template(tokenedEmail)
    )

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




export { register, verifyAccount, login, updateProfile }