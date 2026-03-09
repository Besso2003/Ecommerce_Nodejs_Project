import jwt from "jsonwebtoken";

let validateToken = (req, res, next) => {
    // let token = req.headers.token;
    // instead of token because bearer token reads from  header.auth
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Extract the actual token
    let token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

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