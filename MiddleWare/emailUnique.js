import userModel from "../Models/UserModel.js";

export const emailUnique = async (req, res, next) => {
    let email = req.body.email;
    const user = await userModel.findOne({ email });
    if (user) {
        if(req.url == "/register")
            return res.status(400).json({ message: "email already exists" });
        else if (req.url == "/login")
            req.foundUser = user
            next();
    }else{
        if(req.url == "/register"){
            next();
        }
        else if (req.url == "/login")
            return res.status(400).json({ message: "incorrect creadentials " });
    }
    
    

}
