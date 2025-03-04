import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { constants } from "../../utility/constants";

export const validateSchema = (
  schema: Schema
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate({...req.body, ...req.params, ...req.query});
    if (error) {
      res
        .status(constants.ERROR_STATUS.BAD_REQUEST)
        .json({ error: error.details[0].message });
      return;
    }
    next();
  };
};
