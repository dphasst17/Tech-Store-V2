export interface UserUpdateType {
    table: "users" | "userAddress" | "carts"
    col: "idUser" | "idAddress" | "idCart",
    cValue?: string | number,
    detail: any[]
}
export interface PostType {
    idPost: number, 
    title: string, 
    thumbnails: string, 
    dateAdded: string, 
    poster: string, 
    nameType: string, 
    idType?: number
}