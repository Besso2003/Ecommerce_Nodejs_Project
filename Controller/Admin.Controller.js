
//if the role is admin you can do restrict / unrestrict the user

import PromoCode from "../Models/PromoCode.Model.js"
import userModel from "../Models/UserModel.js"

let restrictProfile = async (req, res) => {
    if (req.decoded_token.role == "admin" ){
        let updatedUser = await userModel.findOneAndUpdate({ email: req.body.email }, { isRestricted: true }, { returnDocument: 'after' })
        if (updatedUser)
            res.json({ message: "user restricted successfully", data: updatedUser })
        else
            res.status(400).json({ message: "this email not exist" })

    }
    else
       res.status(400).json({ message: "Admin only can restrict / unrestrict the user" })
}

let unrestrictProfile = async (req, res) => {
    if (req.decoded_token.role == "admin" ){
        let updatedUser = await userModel.findOneAndUpdate({ email: req.body.email }, { isRestricted: false }, { returnDocument: 'after' })
        if (updatedUser)
            res.json({ message: "user unrestricted successfully", data: updatedUser })
        else
            res.status(400).json({ message: "this email not exist" })

    }
    else
       res.status(400).json({ message: "Admin only can restrict / unrestrict the user" })

}

let createPromoCode = async (req, res) => {
    if (req.decoded_token.role !== "admin") {
        return res.status(400).json({ message: "Admin only can create promo codes" });
    }

    const { code, discountPercentage, maxUsage, expiresAt } = req.body;

    let existing = await PromoCode.findOne({ code });
    if (existing) {
        return res.status(400).json({ message: "Promo code already exists" });
    }

    let newPromo = await PromoCode.create({
        code,
        discountPercentage,
        maxUsage,
        expiresAt
    });

    res.json({ message: "Promo code created successfully", data: newPromo });
};

let activatePromoCode = async (req, res) => {
    if (req.decoded_token.role !== "admin") {
        return res.status(400).json({ message: "Admin only can activate promo code" });
    }

    const { code } = req.body;
    const promo = await PromoCode.findOne({ code });

    if (!promo) return res.status(400).json({ message: "Promo code not found" });
    if (promo.isActive) return res.status(400).json({ message: "Promo code is already active" });

    promo.isActive = true;
    await promo.save();

    res.json({ message: "Promo code activated successfully", data: promo });
};


let deactivatePromoCode = async (req, res) => {
    if (req.decoded_token.role !== "admin") {
        return res.status(400).json({ message: "Admin only can deactivate promo code" });
    }

    const { code } = req.body;

    const promo = await PromoCode.findOne({ code: code });

    if (!promo) {
        return res.status(400).json({ message: "Promo code not found" });
    }

    if (!promo.isActive) {
        return res.status(400).json({ message: "Promo code is already deactivated" });
    }

    promo.isActive = false;
    await promo.save();

    res.json({ message: "Promo code deactivated successfully", data: promo });
};

let listPromoCodes = async (req, res) => {
    if (req.decoded_token.role !== "admin") {
        return res.status(400).json({ message: "Admin only can list promo codes" });
    }

    let promos = await PromoCode.find();
    res.json({ message: "Promo codes list", promos });
};

export { restrictProfile, unrestrictProfile, createPromoCode, deactivatePromoCode, listPromoCodes, activatePromoCode};