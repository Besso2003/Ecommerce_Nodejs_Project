import Joi from "joi";

export const updateProfileSchema = Joi.object({
    name: Joi.string().min(3).max(10).messages({
        "string.min": "Name must be at least 3 characters long for E-commerceApp",
        "string.empty": "Name is required for E-commerceApp",
    }),

    phone: Joi.string().trim().pattern(/^01[0125][0-9]{8}$/)
        .messages({
            "string.base": "invalid phone number  for E-commerceApp",
            "string.pattern.base": "invalid Egyptian phone number for E-commerceApp",
            "string.empty": "phone is required for E-commerceApp"

        })
}).min(1); 