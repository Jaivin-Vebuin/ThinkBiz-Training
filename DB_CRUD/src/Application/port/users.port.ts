import { userReg, userLogin, returnUserData, returnUpdateUserData, getUserData } from "../../Domain/model/userModel"

export type userPort = {
    registerUserPort(user: userReg): Promise<userReg>;
    loginUserPort(user: userLogin): Promise<returnUserData>;
    getAllUserPort():Promise<returnUserData[]>;
    getSpecificUserPort(user: getUserData):Promise<returnUserData>;
    updateUserPort(id:number,user:returnUpdateUserData):Promise<returnUpdateUserData>;
    deleteAnyUserPort(id:number):Promise<string>;
    // deleteSpecificUserPort(id:number,user:getUserData):Promise<string>;
}