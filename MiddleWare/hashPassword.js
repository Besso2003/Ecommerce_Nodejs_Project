import bcrypt from "bcrypt"

export const hashPassword = async (req, res, next) => {

    req.body.password = await bcrypt.hash(req.body.password, 8)
    next()
}