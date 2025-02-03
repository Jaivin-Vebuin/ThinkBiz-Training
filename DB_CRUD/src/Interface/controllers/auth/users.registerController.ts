import { Request, Response } from "express"
import { createUserUseCase } from "../../../Application/use_cases/users.createUserUseCase";
import { userPort } from "../../../Application/port/users.port";
import { userReg } from "../../../Domain/model/userModel";

// registration is creation
export const registerUserController = (userRepo: userPort) => async (req: Request, res: Response) => {
    try {
        const data: userReg = { name: req.body.name, email: req.body.email, password: req.body.password, role: req.body.role, age: req.body.age };
        const response = await createUserUseCase(data, userRepo);
        res.status(201).send({
            response
        })
    } catch (error) {
        res.status(500).send({
            msg: "Internal server error in creation",
            success: false
        })
    }
}