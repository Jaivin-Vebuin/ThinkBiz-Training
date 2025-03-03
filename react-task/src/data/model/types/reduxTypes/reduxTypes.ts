export type AuthTokenPayload = {
  message: string;
  token: string;
};

export type languageReduxInitStateType = {
    language: string;
  };
  

export type authReduxInitStateType = {
    message:string;
    token:string;
}

export interface languageListType {
    value:string;
    label:string;
}