import { getUserData } from "../../Domain/model/userModel";
import { userPort } from "../port/users.port";

export const getUserUseCase = async (data: getUserData, userRepo:userPort) => {
    const userData = data;
    if (data.role === 'U') {
        const oneUserData: getUserData =  userData; 
        const data = await userRepo.getSpecificUserPort(oneUserData.id)
        if(!data)
        {
            return {message: "user not found !!"}
        }
        return { message: "You are a regular user!", data };
    } else if (data.role === 'A') {
        const allUserdata = await userRepo.getAllUserPort();
        return { message: "You are an admin user!", allUserdata };
    } else {
        throw new Error("Invalid role found.");
    }
}