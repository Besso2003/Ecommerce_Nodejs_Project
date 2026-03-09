import express from "express";
import validateToken from "../MiddleWare/validateToken.js";
import { restrictProfile, unrestrictProfile } from "../Controller/Admin.Controller.js";


let adminRouter = express.Router();


adminRouter.use(validateToken)

adminRouter.post("/restrict-profile",restrictProfile)
adminRouter.post("/unrestrict-profile",unrestrictProfile)




export default adminRouter