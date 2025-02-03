//joi validation
import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

export const userUpdateValidationSchema = (req: Request, res: Response, next:NextFunction) => {
    const userUpdateValidationSchema = joi.object({
        id:joi.number().required(),
        name: joi.string().min(1).max(255).required(),
        email: joi.string().email().required(),
        password: joi.string().alphanum().required().min(6).max(15),
        age:joi.number().min(10).max(120).required()
    })
    try {
        const data = req.body;
        const id = parseInt(req.params.id);
        if (!data) {
            res.status(400).send({
                msg: "Data not found for validation !!",
                success: false
            })
        }
        else{
            const result = userUpdateValidationSchema.validate(id,data);
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