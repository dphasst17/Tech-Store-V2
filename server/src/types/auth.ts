export interface Auth{
    username:string,
    password?:string,
    email?:string
}
export interface AuthResponse{
    accessToken:string,
    expAccess:number,
    refreshToken?:string,
    expRefresh?:number
}
