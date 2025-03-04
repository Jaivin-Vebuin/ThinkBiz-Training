//joi validation
import joi from 'joi';

export const userRegistrationValidationSchema = joi.object({
    name: joi.string().min(1).max(255).required(),
    email: joi.string().email().required(),
    password: joi.string().alphanum().required().min(6).max(15),
    role: joi.string().valid('admin','user'),
    age: joi.number().min(10).max(120).required()
})
