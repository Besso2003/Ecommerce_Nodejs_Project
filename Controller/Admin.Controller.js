
//if the role is admin you can do restrict / unrestrict the user

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




export { restrictProfile, unrestrictProfile }