import express from "express";
import { login, register, verifyAccount } from "../Controller/User.Controller.js";
import { hashPassword } from "../MiddleWare/hashPassword.js";
import { emailUnique } from "../MiddleWare/emailUnique.js";



let userRouter = express.Router();

userRouter.post("/register", emailUnique ,hashPassword,register);

userRouter.get("/verify/:emailtoken",verifyAccount)

userRouter.post("/login", emailUnique, login)

export default userRouter