import { userPort } from "../port/users.port";

export const deleteUserUseCase = async (decodedTokenData: { [key: string]: number | string }, dataID: number, userRepo: userPort) => {

    // check if exist

    if (decodedTokenData.role === 'A') {
        const existedUser = await userRepo.getSpecificUserPort(dataID);
        if (!existedUser) {
            return {
                message: "User does not exist !!."
            }
        }
        if (decodedTokenData.id === dataID) {
            const deleteUserData = await userRepo.deleteAnyUserPort(dataID);
            return { message: "You are allowed to delete your account !", deleteUserData }
        }
        else if (decodedTokenData.id !== dataID && (existedUser.role === 'U')) {
            const deleteUserData = await userRepo.deleteAnyUserPort(dataID);
            return { message: "You are admin, you are allowed to delete user account !", deleteUserData }
        }
        else {
            return {
                message: "You can not delete other admin's data !!"
            }
        }
    }
    else {
        if (decodedTokenData.id === dataID) {
            const deleteUserData = await userRepo.deleteAnyUserPort(dataID);
            return { message: "You are regular user !, allowed to delete.", deleteUserData }
        }
        else {
            throw new Error("You are not allowed to Delete other's data !!")
        }
    }
}