export interface CartType{
    idCart:number,
    idProduct:number,
    countProduct:number
    detail:{
        discount:number,
        nameProduct:string,
        imgProduct:string,
        price:number
    }[]
}
export interface UserAddressType{
    type:"default" | "extra", 
    idAddress:number,
    detail:string
}
export interface UserType{
    idUser:string,
    nameUser:string,
    phone:string,
    address:UserAddressType[],
    cart:CartType[]
}
export interface UserUpdateType {
    table: "users" | "userAddress" | "carts"
    col: "idUser" | "idAddress" | "idCart",
    cValue?: string | number,
    detail: any[]
}
export interface UserAddressAddType{
    type:string,
    dataOperation:{
        detail?:string,
        typeAddress?:string
    }
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
export interface ProductType {
    idProduct: number,
    nameProduct: string,
    price: number | string,
    discount?: number,
    imgProduct: string | any[]
    des?: string,
    idType: number,
    nameType: string,
    view: number,
    brand: string,
    detail?: any[]
}
export interface ProductFilterType {
    brand: string[];
    price: string;
    detail?: any[];
}
export interface Auth {
    username:string,
    password?:string,
    confirm?:string,
    email?:string
}
export interface Modals {
    setModalName: React.Dispatch<React.SetStateAction<string>>,
}