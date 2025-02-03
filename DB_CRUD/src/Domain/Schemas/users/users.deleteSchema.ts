import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

export const userDeleteValidationSchema = (req: Request, res: Response, next:NextFunction) => {
    const userDeleteValidationSchema = joi.object({
        id:joi.number().required(),
    })
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            res.status(400).send({
                msg: "Can not delete without id !!",
                success: false
            })
        }
        else{
            const result = userDeleteValidationSchema.validate(id);
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