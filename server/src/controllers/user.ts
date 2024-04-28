import type { Request, Response } from "express";
import type { RequestCustom } from "types/types";
import UserStatement from "models/statement/user";
import Statements, { type ConditionType } from "models/statement/statement";
import { responseData, responseMessage, responseMessageData } from "utils/response";
import { convertData,handleFindData } from "utils/utils";

const userStatement = new UserStatement();
const statement = new Statements();
export default class UserController {
  public getUser = async (request: Request, res: Response) => {
    const req = request as RequestCustom;
    const idUser = req.idUser;
    handleFindData(res,userStatement.getUser(idUser))
  };
  public userUpdate = async (request: Request, res: Response) => {
    const req = request as RequestCustom;
    const idUser = req.idUser;
    const data = req.body;
    const table = data.table;
    const detail = convertData(data.detail);
    const condition:ConditionType = {
        conditionName:data.col,
        conditionMethod:'=',
        value:data.col === "idUser" ? idUser : data.cValue 
    }
    try {
        const result = await statement.updateDataByCondition(table,detail,condition)
        if(!result){
            return responseMessage(res,401,'Update is failed')
        }
        responseMessage(res,200,'Update is success')
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  };
}
