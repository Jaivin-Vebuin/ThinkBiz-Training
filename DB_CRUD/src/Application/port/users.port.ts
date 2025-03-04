import { userReg, userLogin, returnUserData, returnUpdateUserData, getUserData } from "../../Domain/model/userModel"

export type userPort = {
    registerUserPort(user: userReg): Promise<userReg>;
    loginUserPort(user: userLogin): Promise<returnUserData>;
    getAllUserPort(email?:string):Promise<returnUserData[]>;
    getSpecificUserPort(userID: number):Promise<returnUserData>;
    updateUserPort(user:returnUpdateUserData):Promise<returnUpdateUserData>;
    deleteAnyUserPort(id:number):Promise<string>;
    getAllUserPortIntermediate(user:userLogin):Promise<userReg[]>;
    // deleteSpecificUserPort(id:number,user:getUserData):Promise<string>;
}