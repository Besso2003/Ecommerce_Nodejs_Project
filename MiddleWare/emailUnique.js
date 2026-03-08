import userModel from "../Models/UserModel.js";

export const emailUnique = async (req, res, next) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "email already exists" });
    }
    next();
}
