// token generation
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        const JWT_SECRET = process.env.JWT_SECRET ?? ''

        if (token) {
            jwt.verify(token, JWT_SECRET, (err, decode) => {
                if (!err) {
                    res.locals.user = decode
                    next();
                }
                else
                {
                    res.status(401).send({
                        error:err,
                        msg:"Error in decoding."
                    })
                }
            })
            
        }else{
            res.status(401).json({ error: 'Access denied. No token provided.' });
        }  
    } catch (error) {
        res.status(500).send({
            message: "Authentication failed",
            success: false,
            error
        })
    }
}