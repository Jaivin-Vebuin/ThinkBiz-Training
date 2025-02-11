export type userInfoType = {
    id:number;
    name?:string;
    email:string;
    password?:string;
    role?:userRole;
    age?:number;
}

export type userLoginType = {
    email:string;
    password:string;
}

export type userCredentialsType = {
    id:number;
    password:string;
    role:string;
}

export type updateUserType = {
    name?:string;
    password?:string;
    age?:number;
}

type userRole = "admin" | "user";