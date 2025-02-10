import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { constants } from "../../utility/constants";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    const JWT_SECRET = process.env.JWT_SECRET ?? "";

    if (token) {
     
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        
        if (!err && decoded) {
          const payload = decoded as JwtPayload;
          res.locals.user = { id: payload.id, role: payload.role };
          next();
        } else {
          res.status(constants.ERROR_STATUS.JWT_ERROR).send({
            error: constants.ERROR_MESSAGE.JWT_ERROR,
          });
        }
      });
    } else {
      res.status(constants.ERROR_STATUS.JWT_TOKEN_EXPIRED_ERROR).send({
        error: constants.ERROR_MESSAGE.JWT_TOKEN_EXPIRED_ERROR,
      });
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(constants.ERROR_STATUS.JWT_ERROR).send({
        error: constants.ERROR_MESSAGE.JWT_ERROR,
      });
    }
    res.status(constants.ERROR_STATUS.ACCESS_TOKEN_MISSING).send({
      error: constants.ERROR_MESSAGE.ACCESS_TOKEN_MISSING,
    });
  }
};
