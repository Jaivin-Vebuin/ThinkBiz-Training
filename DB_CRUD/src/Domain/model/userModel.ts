type userReg = {
    name: string;
    email: string;
    password: string;
    role: string;
    age: number;
}

type userLogin = {
    email:string;
    password: string;
}

interface getUserData {
    id:number;
    email: string;
    role: string;
}

interface returnUserData {
    id:number;
    name:string;
    email:string;
    role:string;
    age:number;
}

interface returnUpdateUserData {
    id: number;
    name?:string;
    email?:string;
    password?:string;
    age?:number;
}

export { userReg, userLogin, getUserData, returnUserData, returnUpdateUserData }