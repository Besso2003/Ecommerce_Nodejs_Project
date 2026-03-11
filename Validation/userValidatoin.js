
import Joi from "joi";

//this is not relate to user real schema it just validate the data taken from the body of the request before sent it to db and db its validation in real userschema
const userBackendValidationSchema = Joi.object({
    name: Joi.string().min(3).max(10).required().messages({
        "string.min": "Name must be at least 3 characters long for E-commerceApp",
        "string.empty": "Name is required for E-commerceApp",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Invalid Email for E-commerceApp",
    }),
    password: Joi.string()
        .trim()
        .min(8)
        .max(16)
        .required()
        .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/)
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password must not exceed 16 characters",
            "string.pattern.base":
                "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        }),
    phone: Joi.string().trim().pattern(/^01[0125][0-9]{8}$/)
        .required().messages({
            "string.base": "invalid phone number  for E-commerceApp",
            "string.pattern.base": "invalid Egyptian phone number for E-commerceApp",
            "string.empty": "phone is required for E-commerceApp"
            
        }),
    role: Joi.string().valid("customer", "admin", "seller").default("customer").messages({
        "string.empty": "role is required for E-commerceApp",
        "string.base": "invalid role for E-commerceApp",
    })
   

})


export default userBackendValidationSchema