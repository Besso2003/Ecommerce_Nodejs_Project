import Joi from "joi";

// Create Category Validation
export const createCategorySchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        "string.min": "Category name must be at least 3 characters",
        "string.max": "Category name must not exceed 50 characters",
        "string.empty": "Category name is required",
        "any.required": "Category name is required"
    }),
    description: Joi.string().min(10).max(200).optional().messages({
        "string.min": "Description must be at least 10 characters",
        "string.max": "Description must not exceed 200 characters",
    }),
    image: Joi.string().uri().optional().messages({
        "string.uri": "Image must be a valid URL",
    })
});

// Update Category Validation
export const updateCategorySchema = Joi.object({
    name: Joi.string().min(3).max(50).optional().messages({
        "string.min": "Category name must be at least 3 characters",
        "string.max": "Category name must not exceed 50 characters",
        "string.empty": "Category name is required",
        "any.required": "Category name is required"
    }),
    description: Joi.string().min(10).max(200).optional().messages({
        "string.min": "Description must be at least 10 characters",
        "string.max": "Description must not exceed 200 characters",
    }),
    image: Joi.string().uri().optional().messages({
        "string.uri": "Image must be a valid URL",
    })
}).min(1).messages({
    "object.min": "At least one field is required to update"
});