import { Request, Response } from "express"
import { deleteUserUseCase } from "../../../Application/use_cases/users.deleteUserUseCase";
import { userPort } from "../../../Application/port/users.port";


export const deleteUserByIDController = (userRepo: userPort)=> async (req:Request,res:Response) => {
    try {
        const decodedData = res.locals.user.role;
        const id = parseInt(req.params.id);
        const response = await deleteUserUseCase(decodedData,id,userRepo)
        if (!response) { 
            res.status(404).send({
                msg: "User not found.",
                success: false
            });
        }
        res.status(200).send({
            msg: "deleted successfully !!",
            response
        })
    } catch (error) {
        res.status(500).send({
            msg: "Internal error in deletion !!",
            error
        })
    }
}