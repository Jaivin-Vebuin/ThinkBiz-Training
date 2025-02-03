//joi validation
import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

export const userUpdateValidationSchema = joi.object({
    id: joi.number().required(),
    name: joi.string().min(1).max(255),
    email: joi.string().email(),
    password: joi.string().alphanum().min(6).max(15),
    age: joi.number().min(10).max(120),
})
