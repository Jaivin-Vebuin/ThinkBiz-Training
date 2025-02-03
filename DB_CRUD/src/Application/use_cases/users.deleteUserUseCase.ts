import { userPort } from "../port/users.port";

export const deleteUserUseCase = async (roleData:string, id:number, userRepo:userPort) => {
    if(roleData === 'A')
    {
        const deleteUserData = await userRepo.deleteAnyUserPort(id);
        return {message:"You are admin user !, allowed to delete.", deleteUserData}
    }
    else
    {
        throw new Error("You are not allowed to Delete !!")
    }
}