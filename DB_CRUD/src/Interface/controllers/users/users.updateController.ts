import { Request, Response } from "express"
import { updateUserUseCase } from "../../../Application/use_cases/users.updateUserUseCase";
import { userPort } from "../../../Application/port/users.port";


export const updateUserByIDController = (userRepo:userPort)=> async (req: Request, res: Response) => {
    try {
        console.log("controller");
        
        const updationData = req.body;
        const decodedID = res.locals.user.id;
        const response = await updateUserUseCase(decodedID,updationData,userRepo)
        if(!response.updateUserData)
        {
            res.status(401).send({
                msg:"failed to update !!"
            })
        }
        res.status(200).send({
            msg: "updated successfully !!",
            response
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: "Internal server error in updation !!",
            success: false
        })
    }
}
