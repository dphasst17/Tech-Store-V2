export interface UserUpdateType{
    table:"users" | "userAddress" | "carts"
    col:"idUser" | "idAddress" | "idCart",
    cValue?:string | number,
    detail: any[]
}