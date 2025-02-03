import { Request, Response } from "express"
import { getUserUseCase } from "../../../Application/use_cases/users.getUserUseCase";
import { userPort } from "../../../Application/port/users.port";

export const getUserController = (userRepo:userPort)=> async (_req: Request, res: Response) => {
    try {
        const decodedData = res.locals.user;
        const response = await getUserUseCase(decodedData,userRepo);
        if (!response) { 
            res.status(404).send({
                msg: "User not found.",
                success: false
            });
        }

        res.status(200).send({
            msg: "fetched successfully !!",
            response
        })
    } catch (error) {
        res.status(500).send({
            msg: "Internal server error in fetching !!",
            success: false
        })
    }
}