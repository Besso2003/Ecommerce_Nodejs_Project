import { sendEmail } from "../Email/email.js"
import UserModel from "../Models/UserModel.js"
import jwt from "jsonwebtoken"

//should hide password (done), check email is unique , hash password, send confirmation email,do backend validatoin
let register = async (req, res) => {
    let addedUser = await UserModel.insertOne(req.body)

    sendEmail(req.body.email)
    addedUser.password = undefined
    res.json({message: "user registered successfully",
              warn: "check your email to confirm your account",
              data: addedUser})
}

let verifyAccount = async (req, res) => {
    let realEmail = jwt.verify(req.params.emailtoken, "secret")
    let user = await UserModel.findOneAndUpdate({email: realEmail}, {isConfirmed: true})
    res.json({message: "account verified successfully"})
}

export { register ,verifyAccount}