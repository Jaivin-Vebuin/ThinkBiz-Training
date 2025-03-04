import { userInfoType } from "../../../domain/model/users_model";
import { Response } from "express";

export const displayResponseFunction = (code:number, res:Response, message: string|userInfoType|userInfoType[]) =>{
    if(typeof(message) === 'string')
    {
        return res.status(code).send({message:message})
    }
    else
    {
        return res.status(code).send({message})
    }
}