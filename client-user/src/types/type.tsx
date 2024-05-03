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
export interface ProductType{
    idProduct:number,
    nameProduct:string,
    price:number | string,
    discount?:number,
    imgProduct:string | any[]
    des?:string,
    idType:number,
    nameType:string,
    view:number,
    brand:string,
    detail?:any[]
}