export const languages = [
    {
        value:'en',
        label:"English"
    },
    {
        value:'hi',
        label:"हिन्दी"
    },
]

export const roles = [
    {
        value:"admin",
        label:"admin"
    },
    {
        value:"user",
        label:"user"
    }
]

export const sliceNames = {
    languageSlice:"lang",
    authSlice:"auth"
}

export const axiosConstants = {
    baseURL:"http://localhost:4000/users",
    loginPath:"/login",
    registerPath:'/register',
    getUserData:'/',
    getAllQuery:'?isAll=1',
}