import type { Request, Response } from "express";
import ProductStatement from "models/statement/product";
import type { ProductType, TypeDetail } from "types/types";
import { responseData, responseMessageData } from "utils/response";

const products = new ProductStatement()
const handleFindData = async(res:any,handle:any) => {
    try{
        const result = <ProductType[]> await handle
        responseData(res,200,result)
    }
    catch{(errors:any) => {
        responseMessageData(res,500,'Server errors',errors)
    }}
}
export default class Products{
    public getAll = async(req:Request,res:Response) => {
        handleFindData(res,products.findAll())
    }
    public getByType = async(req:Request,res:Response) => {
        const typeName = req.params['nameType']
        const colType = await products.getColumnByType(typeName)
        const colDetail = colType.map((c:TypeDetail) => c.name)
        const shortKey = typeName.slice(0,3)
        handleFindData(res,products.findByType(typeName,shortKey,colDetail))
    }
    public getDetail = async(req:Request,res:Response) => {
        const type = req.params['type']
        const idProduct = req.params['idProduct']
        const colType = await products.getColumnByType(type)
        const colDetail = colType.map((c:TypeDetail) => c.name)
        try{
            const result = <ProductType[]> await products.findDetail(Number(idProduct),type,colDetail)
            const parseResult = result.map((e:any) => {
                let subImg = e.img;
                let parseDetail = e.detail;
                let resultData:any = {}
                Object.keys(parseDetail[0]).forEach(key => {
                  let values = parseDetail.map((d:any) => d[key]);
                  resultData[key] = Array.from(new Set(values));
                });
                let formatResult = {
                  ...e,
                  imgProduct: subImg.every((c:any) =>
                    Object.values(c).every((value) => value === null)
                  )
                    ? [{ img: e.imgProduct, type: "default" }]
                    : [{ img: e.imgProduct, type: "default" }, ...subImg],
                  detail: [resultData],
                };
                delete formatResult.img;
                return formatResult;
              })
            responseData(res,200,parseResult)
        }
        catch{(errors:any) => {
            responseMessageData(res,500,'Server errors',errors)
        }}
    }
    public getNew = async(req:Request,res:Response) => {
        handleFindData(res,products.findByCondition("new"))
    }
    public getView = async(req:Request,res:Response) => {
        handleFindData(res,products.findByCondition("view"))
    }
    public search = async(req:Request,res:Response) => {
        const keyword = req.params['key']
        handleFindData(res,products.findByKey(keyword))
    }
    public insertProduct = async(req:Request,res:Response) => {

    }
}