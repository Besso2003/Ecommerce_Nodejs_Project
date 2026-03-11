import express from "express";
import {  login, register, updateProfile, verifyAccount } from "../Controller/User.Controller.js";
import { hashPassword } from "../MiddleWare/hashPassword.js";
import { emailUnique } from "../MiddleWare/emailUnique.js";
import { userValidationMiddleWare, validateUpdateProfile } from "../MiddleWare/UserValidatoin.js";
import validateToken from "../MiddleWare/validateToken.js";



const userRouter = express.Router();

userRouter.post("/register", userValidationMiddleWare,emailUnique ,hashPassword,register);

userRouter.get("/verify/:emailtoken",verifyAccount)

userRouter.post("/login", emailUnique, login)

userRouter.post("/update-profile",validateToken,validateUpdateProfile,updateProfile )


userRouter.post("/review-product",validateToken)




export default userRouter