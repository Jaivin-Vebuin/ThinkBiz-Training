import { userReg } from "../../Domain/model/userModel";
import { userPort } from "../port/users.port";

export const createUserUseCase = async (data: userReg, userRepo:userPort) => {
    const { name, email, password, role, age } = data;
    const newUser: userReg = { name, email, password, role, age };
    const response = await userRepo.registerUserPort(newUser);
    return { 
        message: "User created successfully !!",
        response
    }
}