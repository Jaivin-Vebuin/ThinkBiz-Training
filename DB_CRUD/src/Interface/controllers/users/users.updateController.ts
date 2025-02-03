import { Request, Response } from "express"
import { updateUserUseCase } from "../../../Application/use_cases/users.updateUserUseCase";
import { userPort } from "../../../Application/port/users.port";


export const updateUserByIDController = (userRepo:userPort)=> async (req: Request, res: Response) => {
    try {
        const updationData = req.body;
        const decodedData = res.locals.user.role;
        const id = parseInt(req.params.id);
        const response = await updateUserUseCase(decodedData,id,updationData,userRepo)
        console.log(response)
        res.status(200).send({
            msg: "updated successfully !!",
            response
        })
    } catch (error) {
        res.status(500).send({
            msg: "Internal server error in updation !!",
            success: false
        })
    }
}
