import { updateProfileSchema } from "../Validation/updateProfile.js"
import userBackendValidationSchema from "../Validation/userValidatoin.js"

 const userValidationMiddleWare =  (req, res, next) => {
   const result = userBackendValidationSchema.validate(req.body)
   if (result.error) {
       return res.status(400).json({ message: result.error.details[0].message })
   }
   next()
}

 const validateUpdateProfile = (req, res, next) => {

  let { error } = updateProfileSchema.validate(req.body)

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    })
  }

  next()
}

export {userValidationMiddleWare,validateUpdateProfile}