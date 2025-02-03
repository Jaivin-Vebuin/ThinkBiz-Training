import { userPort } from "../port/users.port";

export const deleteUserUseCase = async (decodedTokenData: { [key: string]: number | string }, dataID: number, userRepo: userPort) => {
    
    // check if exist
    
    if (decodedTokenData.role === 'A') {
        const deleteUserData = await userRepo.deleteAnyUserPort(dataID);
        return { message: "You are admin user !, allowed to delete.", deleteUserData }
    }
    else{
        if (decodedTokenData.id === dataID) {
            const deleteUserData = await userRepo.deleteAnyUserPort(dataID);
            return { message: "You are regular user !, allowed to delete.", deleteUserData }
        }
        else {
            throw new Error("You are not allowed to Delete other's data !!")
        }
    }
}