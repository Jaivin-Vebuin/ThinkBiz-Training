import { userReg } from "../../Domain/model/userModel";
import { userPort } from "../port/users.port";

export const createUserUseCase = async (data: userReg, userRepo:userPort) => {

    const existedUser = await userRepo.getAllUserPort(data.email);
    

    if(!existedUser.length)
    {
        const newUser: userReg = data;
        const response = await userRepo.registerUserPort(newUser);
        return { 
            message: "User created successfully !!",
            response
        }
    }

    return {
        message: "User already exist !!"
    }

}