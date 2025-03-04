import { Request, Response } from "express"
import { loginUserUseCase } from "../../../Application/use_cases/users.loginUserUseCase";
import { userPort } from "../../../Application/port/users.port";
import { userLogin } from "../../../Domain/model/userModel";

export const loginUserController = (userRepo: userPort) => async (req: Request, res: Response): Promise<void> => {
    try {
        const data:userLogin = {email: req.body.email, password: req.body.password}
        const token = await loginUserUseCase(data, userRepo);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({
            message: "Login failed"
        });
    }
};