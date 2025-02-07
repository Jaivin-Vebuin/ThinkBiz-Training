import { returnUpdateUserData } from "../../Domain/model/userModel";
import { userPort } from "../port/users.port";

export const updateUserUseCase = async (decodedID: number, updationData: returnUpdateUserData, userRepo: userPort) => {

    const existedUserList = await userRepo.getAllUserPort();
    const existed = existedUserList.map((u) => {
        return updationData.id === u.id;
    })

    if (!existed.length) {
        if (decodedID === updationData.id) {
            const updateUserData = await userRepo.updateUserPort(updationData);
            return { message: "You are allowed to update", updateUserData };
        }
        else {
            return { message: "You are not allowed to update !!" }
        }
    }
    else{
        return { message: "User does not exist !!" }
    }
}