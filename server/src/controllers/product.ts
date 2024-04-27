import type { Request, Response } from "express";
import ProductStatement from "models/statement/product";
import Statement, { type ConditionType } from "models/statement/statement"
import type { ProductType, TypeDetail } from "types/types";
import { responseData, responseMessage, responseMessageData } from "utils/response";

const products = new ProductStatement();
const statement = new Statement()
const handleFindData = async (res: any, handle: any) => {
  try {
    const result = <ProductType[]>await handle;
    responseData(res, 200, result);
  } catch {
    (errors: any) => {
      responseMessageData(res, 500, "Server errors", errors);
    };
  }
};
const convertData = (arr:any[]) => {
  return Object.keys(arr[0]).map((c:string) => {return {nameCol:c,value:arr[0][c]}})
}
const convertMultiData = (arr:any[]) => {
  const getKey = Object.keys(arr[0])
  const formatData = arr.map((a:any) => {
    return getKey.map((k:string) => {
      return {
        nameCol:k,
        value:a[k]
      }
    })
  })
  return formatData
}
export default class Products {
  public getAll = async (req: Request, res: Response) => {
    handleFindData(res, products.findAll());
  };
  public getByType = async (req: Request, res: Response) => {
    const typeName = req.params["nameType"];
    const colType = await products.getColumnByType(typeName);
    const colDetail = colType.map((c: TypeDetail) => c.name);
    const shortKey = typeName.slice(0, 3);
    handleFindData(res, products.findByType(typeName, shortKey, colDetail));
  };
  public getDetail = async (req: Request, res: Response) => {
    const type = req.params["type"];
    const idProduct = req.params["idProduct"];
    const colType = await products.getColumnByType(type);
    const colDetail = colType.map((c: TypeDetail) => c.name);
    try {
      const result = <ProductType[]>await products.findDetail(Number(idProduct), type, colDetail);
      const parseResult = result.map((e: any) => {
        let subImg = e.img;
        let parseDetail = e.detail;
        let resultData: any = {};
        Object.keys(parseDetail[0]).forEach((key) => {
          let values = parseDetail.map((d: any) => d[key]);
          resultData[key] = Array.from(new Set(values));
        });
        let formatResult = {
          ...e,
          imgProduct: subImg.every((c: any) => Object.values(c).every((value) => value === null))
            ? [{ img: e.imgProduct, type: "default" }]
            : [{ img: e.imgProduct, type: "default" }, ...subImg],
          detail: [resultData],
        };
        delete formatResult.img;
        return formatResult;
      });
      responseData(res, 200, parseResult);
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  };
  public getNew = async (req: Request, res: Response) => {
    handleFindData(res, products.findByCondition("new"));
  };
  public getView = async (req: Request, res: Response) => {
    handleFindData(res, products.findByCondition("view"));
  };
  public search = async (req: Request, res: Response) => {
    const keyword = req.params["key"];
    handleFindData(res, products.findByKey(keyword));
  };
  public getSaleEvent = async (req: Request, res: Response) => {
    handleFindData(res, products.findSaleEvent());
  };
  public getSaleDetail = async (req: Request, res: Response) => {
    const idSale = req.params["idSale"];
    handleFindData(res, products.findSaleDetail(Number(idSale)));
  };
  public insertProduct = async (req: Request, res: Response) => {
    const data = req.body;
    const product = convertData(data.product)
    const detail = convertData(data.detail)
    try {
      const insertProduct = await statement.insertData('products',product);
      const convertDetail = [...detail,{nameCol:'idProduct',value:Number(111)}]
      const insertDetail = await statement.insertData(data.tableName,convertDetail)
      insertProduct && insertDetail ? 
      responseMessageData(res,201,'Add new product is success',{id:Number(insertProduct.insertId)})
      : responseMessage(res, 500, "Server errors");
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  };
  public updateProduct = async (req: Request, res: Response) => {
    const data = req.body;
    const product = data.product && convertData(data.product)
    const detail = data.detail && convertData(data.detail)
    const condition:ConditionType = {
      conditionName:"idProduct",
      conditionMethod:"=",
      value:data.idProduct
    }
    try {
      const insertProduct = data.product && await statement.updateDataByCondition('products',product,condition)
      const insertDetail = data.detail && await statement.updateDataByCondition(data.tableName,detail,condition);
      (insertProduct || insertDetail) ? 
      responseMessage(res,200,'Update product is success')
      : responseMessage(res, 500, "Server errors");
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  };
  public insertSaleEvent = async (req:Request, res:Response) => {
    const data = req.body;
    const sale = convertData(data.sale);
    const saleDetail = convertMultiData(data.detail)
    try{
      const insertSale = await statement.insertData('sale',sale)
      const insertDetail = await statement.insertDataMulti('saleDetail',saleDetail)
      insertSale && insertDetail ? 
      responseMessageData(res,201,'Add new sale event is success',{id:Number(insertSale.insertId)})
      : responseMessage(res, 500, "Server errors");
    }
    catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  }
  public updateSaleEvent = async (req:Request, res:Response) => {}

}
