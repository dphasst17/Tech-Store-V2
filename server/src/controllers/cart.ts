import type { Request, Response } from "express";
import type { ConditionType } from "models/statement/statement";
import Statements from "models/statement/statement";
import type { RequestCustom } from "types/types";
import { responseMessage, responseMessageData } from "utils/response";
import { convertData, handleChangeData } from "utils/utils";

const statement = new Statements();
export default class CartController {
  public cartInsert = async (request: Request, res: Response) => {
    const req = request as RequestCustom;
    const idUser = req.idUser;
    const data = req.body;
    const dataInsert = convertData(data.cart);
    handleChangeData(res, statement.insertData("cart", dataInsert), "add");
  };
  public cartUpdateCount = async (req: Request, res: Response) => {
    const data = req.body;
    const condition: ConditionType = {
      conditionName: "idCart",
      conditionMethod: "=",
      value: data.id,
    };
    const dataUpdate = {
      nameCol: "countProduct",
      value: data.value,
    };
    handleChangeData(res,statement.updateDataByCondition("carts", [dataUpdate], condition),"update")
  };
  public cartRemove = async(req: Request, res: Response) => {
    const data = req.body;
    const condition: ConditionType = {
        conditionName: "idCart",
        conditionMethod: "in",
        value: data.listId,
      };
    handleChangeData(res,statement.removeData("carts",condition),"delete")
  }
}
