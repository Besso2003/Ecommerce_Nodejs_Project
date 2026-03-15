import Joi from "joi";

// Create Product Validation
export const createProductSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        "string.min": "Product name must be at least 3 characters",
        "string.max": "Product name must not exceed 100 characters",
        "string.empty": "Product name is required",
        "any.required": "Product name is required"
    }),
    description: Joi.string().min(10).max(1000).optional().messages({
        "string.min": "Description must be at least 10 characters",
        "string.max": "Description must not exceed 1000 characters",
    }),
    price: Joi.number().min(1).required().messages({
        "number.base": "Price must be a number",
        "number.min": "Price must be at least 1",
        "any.required": "Price is required"
    }),
    images: Joi.array().items(
        Joi.string().uri().messages({
            "string.uri": "Each image must be a valid URL"
        })
    ).optional().messages({
        "array.base": "Images must be an array of URLs"
    }),
    stock: Joi.number().integer().min(0).optional().messages({
        "number.base": "Stock must be a number",
        "number.integer": "Stock must be a whole number",
        "number.min": "Stock cannot be negative",
    }),
    category: Joi.string().hex().length(24).required().messages({
        "string.hex": "Category ID must be a valid MongoDB ObjectId",
        "string.length": "Category ID must be a valid MongoDB ObjectId",
        "string.empty": "Category is required",
        "any.required": "Category is required"
    })
});

// Update Product Validation
export const updateProductSchema = Joi.object({
    name: Joi.string().min(3).max(100).optional().messages({
        "string.min": "Product name must be at least 3 characters",
        "string.max": "Product name must not exceed 100 characters",
    }),
    description: Joi.string().min(10).max(1000).optional().messages({
        "string.min": "Description must be at least 10 characters",
        "string.max": "Description must not exceed 1000 characters",
    }),
    price: Joi.number().min(0).optional().messages({
        "number.base": "Price must be a number",
        "number.min": "Price must be at least 0",
    }),
    images: Joi.array().items(
        Joi.string().uri().messages({
            "string.uri": "Each image must be a valid URL"
        })
    ).optional().messages({
        "array.base": "Images must be an array of URLs"
    }),
    stock: Joi.number().integer().min(0).optional().messages({
        "number.base": "Stock must be a number",
        "number.integer": "Stock must be a whole number",
        "number.min": "Stock cannot be negative",
    }),
    category: Joi.string().hex().length(24).optional().messages({
        "string.hex": "Category ID must be a valid MongoDB ObjectId",
        "string.length": "Category ID must be a valid MongoDB ObjectId",
    })
}).min(1).messages({
    "object.min": "At least one field is required to update"
});

// Update Stock Validation
export const updateStockSchema = Joi.object({
    stock: Joi.number().integer().min(0).required().messages({
        "number.base": "Stock must be a number",
        "number.integer": "Stock must be a whole number",
        "number.min": "Stock cannot be negative",
        "any.required": "Stock is required"
    })
});