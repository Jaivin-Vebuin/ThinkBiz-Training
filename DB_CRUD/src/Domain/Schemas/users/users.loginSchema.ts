import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

export const userLoginValidationSchema = (req: Request, res: Response, next:NextFunction) => {
    
    const userLoginValidationSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().alphanum().required().min(6).max(15),
    })
    try {
        const data = req.body
        if (!data) {
            res.status(400).send({
                msg: "Data not found for validation !!",
                success: false
            })
        }
        else{
            const result = userLoginValidationSchema.validate(data);
            if(!result)
            {
                res.status(400).send({
                    msg:"Data validation failed !!"
                })
            }
            else
            {
                next();
            }
        }
    } catch (error) {
        res.status(500).send({
            msg: "Internal server error for validation !!",
            success: false
        })
    }
}