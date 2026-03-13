import express from "express";
import validateToken from "../MiddleWare/validateToken.js";
import { restrictProfile, unrestrictProfile, createPromoCode, deactivatePromoCode, listPromoCodes, activatePromoCode } from "../Controller/Admin.Controller.js";


const adminRouter = express.Router();


adminRouter.use(validateToken)

adminRouter.post("/restrict-profile",restrictProfile)
adminRouter.post("/unrestrict-profile",unrestrictProfile)

// promo code
adminRouter.post("/promo/create", createPromoCode)
adminRouter.post("/promo/deactivate", deactivatePromoCode)
adminRouter.get("/promo/list", listPromoCodes)
adminRouter.post("/promo/activate", activatePromoCode)



export default adminRouter