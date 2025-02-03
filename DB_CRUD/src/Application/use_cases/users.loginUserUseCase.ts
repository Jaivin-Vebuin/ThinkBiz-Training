import jwt from 'jsonwebtoken';
import { userLogin } from "../../Domain/model/userModel";
import { userPort } from '../port/users.port';

export const loginUserUseCase = async (data: userLogin, userRepo: userPort) => {

    const existedUserList = userRepo.getAllUserPortIntermediate(data);
    const existed = (await existedUserList).find((u) => {
        return data.email === u.email;
    })
    if (!existed || existed.password !== data.password) {
        return "Invalid user credentials. !!"
    }


    const loginData = data;
    const user = await userRepo.loginUserPort(loginData);
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });
    return token;

};