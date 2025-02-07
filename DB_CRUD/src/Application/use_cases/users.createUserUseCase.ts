import { userReg } from "../../Domain/model/userModel";
import { userPort } from "../port/users.port";

export const createUserUseCase = async (data: userReg, userRepo:userPort) => {

    const existedUserList = await userRepo.getAllUserPort();
    const existed = existedUserList.map((u) => {
        return data.email === u.email;
    })
    if(!existed.length)
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