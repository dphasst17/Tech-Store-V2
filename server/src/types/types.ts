import type { Request } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayloadCustom extends jwt.JwtPayload {
  exp: number;
}
export interface RequestCustom extends Request {
  idUser: string;
}
export interface ProductType{
  idProduct:number,
  nameProduct:string,
  price:number,
  imgProduct:string,
  dateAdded?:Date
  des?:string,
  view?:number,
  idType:number,
  brand:string,
  detail?:[],
  [x:string]:any
}
export interface UserType{
  idUser:string,
  nameUser:string,
  img?:string,
  email?:string,
  phone?:string,
  created_at?:Date,
  updated_at?:Date,
}
export interface UserAddressType{
  id:number,
  idUser:string,
  type:'default' | 'extra',
  detail:string
}
export interface CartType{
  idUser:string,
  idProduct?:number,
  countProduct?:number,
  detail?:string | any | null
}

export interface TypeProduct{
  idType:number,
  nameType:string
}
export interface TypeDetail{
  id:string,
  type:string,
  name:string,
  datatypes:string,
  displayname:string,
  displayorder:number
}
export interface TransportType{
  idTrans:number,
  idUser:string | null,
  idShipper:string,
  fullName:string,
  phone:string,
  address:string,
  costs:number,
  method:string,
  edd:Date,
  paymentStatus:'paid' | 'unpaid'
}
export interface TransportDetailType{
  idOrdDetail:number,
  idTrans:number,
  idProduct:number,
  countProduct:number,
  discount:number,
  status:string
}

export interface OrderType{
  idBill?:string, //id for bill table
  idFail?:string, // id for failOrder table
  idUser:string,
  infoOrder:string,
  costs?:number, // this is column in bill table
  dateBuy?:Date, // this is column in bill table
  note?:string, // this is column in failOrder table
  detailReason?:string, // this is column in failOrder table
  total:string // this is column in bill table
}

export interface OrderDetailType{
  idDetail?:number,//id for billDetail table
  idFailDetail?:number, //id for failOrderDetail table
  idProduct:number,
  countProduct:number,
  discount?:number, // this is column in billDetail table
  total?:number // this is column in billDetail table
}

export interface WarehouseType{
  id:number,
  idProduct:number,
  idpersonIOX:string,
  dateIOX:Date,
  countProduct:number,
  statusWare:'import' | 'export'
}
export interface SaleType{
  idSale:number,
  start_date:Date,
  end_date:Date,
  title:string
}
export interface SaleDetailType{
  id:number,
  idSale:number,
  idProduct:number,
  discount:number
}
export interface CategoryPostsType{
  idType:number,
  nameType:string,
  create_at:Date,
  update_at:Date
}
export interface PostsType{
  idPosts:number,
  dateAdded:Date,
  idType:number,
  nameType?:string,
  poster:string,
  valuePosts:string,
  create_at:Date,
  update_at:Date
}
export interface ImageProductType{
  idImg:number,
  idProduct:number,
  type:"extra"|"default",
  img:string

}
export interface CommentType{
  idComment:number,
  commentValue:string,
  idProduct:number,
  dateComment:string
}