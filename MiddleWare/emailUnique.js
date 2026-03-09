import userModel from "../Models/UserModel.js";

export const emailUnique = async (req, res, next) => {
    let email = req.body?.email;

    // If email missing entirely
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const user = await userModel.findOne({ email });

    if (user) {
        if (req.url === "/register") {
            return res.status(400).json({ message: "email already exists" });
        } 
        else if (req.url === "/login") 
            req.foundUser = user;
            return next();
        
    } else {
        if (req.url === "/register") {
            return next();
        } 
        else if (req.url === "/login") {
            return res.status(400).json({ message: "incorrect credentials" });
        }
    }
};
