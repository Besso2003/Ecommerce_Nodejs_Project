import jwt from "jsonwebtoken";

let validateToken = (req, res, next) => {
    let token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    
    jwt.verify(token, "secret", async (err, decoded_token) => {
        if (err) {
            return res.status(401).json({ message: "Invalid Token" })
        } else {
            req.decoded_token = decoded_token
            next()
        }
    })

}
export default validateToken