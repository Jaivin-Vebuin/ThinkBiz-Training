import jwt from 'jsonwebtoken';
import { userLogin } from "../../Domain/model/userModel";
import { userPort } from '../port/users.port';

export const loginUserUseCase = async (data:userLogin,userRepo:userPort) => {
    
    // if(existingToken === '')
    // {
        const loginData = data
        const user = await userRepo.loginUserPort(loginData);
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });
        return token;
    // }
    // else if(existingToken !== '')
    // {
    //     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });
    // }
    
};