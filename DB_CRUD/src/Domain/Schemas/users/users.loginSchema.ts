import joi from 'joi';


export const userLoginValidationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})
