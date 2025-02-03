import { returnUpdateUserData } from "../../Domain/model/userModel";
import { UserRepository } from "../../Infrastructure/repositories/userrepository/user.repo";
import { userPort } from "../port/users.port";

export const updateUserUseCase = async (roleData:string ,id:number, updationData:returnUpdateUserData, userRepo:userPort) => {
    if (roleData === 'U') {
        const updateUserData = await userRepo.updateUserPort(id,updationData);
        return { message: "You are regular user!!, allowed to update", updateUserData };
    } else {
        throw new Error("You are not allowed to Update !!")
    }
}