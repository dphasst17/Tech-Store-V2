import type { Request, Response } from "express";
import Statements, { type ConditionType } from "models/statement/statement";
import OrderStatement from "models/statement/order";
import type { RequestCustom } from "types/types";
import { responseData, responseMessage, responseMessageData } from "utils/response";
import { convertData, handleFindData } from "utils/utils";
import crypto from "crypto";
import { sql } from "kysely";
import { db } from "models/connect";

const order = new OrderStatement();
const statement = new Statements();
let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1;
let year = dateObj.getUTCFullYear();
const randomText = (length: number) => {
  return crypto.randomBytes(length).toString("hex");
};
export default class OrderController {
  public getAll = async () => {};
  public getByUser = async (request: Request, res: Response) => {
    const req = request as RequestCustom;
    const idUser = req.idUser;
    handleFindData(res, order.getOrderByUser(idUser));
  };
  public insertOrder = async (request: Request, res: Response) => {
    const req = request as RequestCustom;
    const idUser = req.idUser;
    const data = req.body;
    const idTrans = `${idUser}${month}${year}-${randomText(4)}`;
    const addData = data.tran.map((c: any) => {
      return {
        ...c,
        idTrans: idTrans,
        idUser: idUser,
      };
    });
    const insertData = await db.transaction().execute(async (trx) => {
      const insert = await trx.insertInto("ord").values(addData[0]).executeTakeFirst();

      const setFk = sql`SET FOREIGN_KEY_CHECKS=0`.execute(trx);
      const insertDetail = await trx
        .insertInto("ordDetail")
        .columns(["idTrans", "idProduct", "countProduct", "discount", "status"])
        .expression((eb: any) =>
          eb
            .selectFrom("carts")
            .select([
              sql`${idTrans}`,
              "carts.idProduct",
              "countProduct",
              sql`IF(sale.end_date >= CURDATE() AND sale.start_date <= CURDATE(), IFNULL(sd.discount, 0), 0)`.as(
                "discount"
              ),
              sql`"Chờ xác nhận"`,
            ])
            .leftJoin("products as p", "p.idProduct", "carts.idProduct")
            .leftJoin("saleDetail as sd", "p.idProduct", "sd.idProduct")
            .leftJoin("sale", "sd.idSale", "sale.idSale")
            .where("carts.idCart", "in", data.listId)
        )
        .execute();
      const rmFk = sql`SET FOREIGN_KEY_CHECKS=1`.execute(trx);
      return { insert, setFk, insertDetail, rmFk };
    });
    if (!insertData.insertDetail[0].insertId) {
      return responseMessage(res, 401, "Order failed");
    }
    responseMessage(res, 201, "Order success");
  };
  public updateOrder = async (req: Request, res: Response) => {
    const data = req.body;
    const valueUpdate = {
      nameCol: "status",
      value: data.status,
    };
    const condition: ConditionType = {
      conditionName: "idTrans",
      conditionMethod: "=",
      value: data.id,
    };
    try {
      const updateStatus = await statement.updateDataByCondition("ordDetail", [valueUpdate], condition);
      if (!updateStatus) {
        return responseMessage(res, 401, "Status update failed");
      }
      if (data.status === "Thành công" || data.status === "Thất bại") {
        const colInsertDetail = ["idOrder", "idProduct", "countProduct", "discount"];
        const tableSelect = "ord";
        const tableSelectDetail = "ordDetail";
        const colSelectDetail = ["idTrans","idProduct","countProduct","discount"]
        const condition: ConditionType = {
          conditionName: "idTrans",
          conditionMethod: "=",
          value: data.id,
        };
        if (data.status === "Thành công") {
          const tableInsert = "ords";
          const tableInsertDetail = "ordsDetail";
          const colInsert = ["idBill","idUser","idShipper","infoOrder","costs","dateBuy"]
          const colSelect = [
            "idTrans",
            "idUser",
            "idShipper",
            sql`CONCAT('name:',fullName,' - phone: ',phone,' - address: ',address)`.as("infoOrder"),
            "costs",
            sql`${new Date().toISOString().split("T")[0]}`.as("dateBuy"),
          ];
          const insertOrderS = await statement.insertSubQuery(tableInsert, colInsert, tableSelect, colSelect, condition);
          const insertOrderSDetail = await statement.insertSubQuery(tableInsertDetail,colInsertDetail,tableSelectDetail,colSelectDetail,condition);
        }
        if (data.status === "Thất bại") {
          const tableInsert = "ordf";
          const tableInsertDetail = "ordfDetail";
          const colInsert = ["idFail","idUser","infoOrder","note"]
          const colSelect = [
            "idTrans",
            "idUser",
            sql`CONCAT('name:',fullName,' - phone: ',phone,' - address: ',address)`.as("infoOrder"),
            sql`${data.note ? data.note : ""}`.as("note"),
          ];
          const insertOrderF = await statement.insertSubQuery(tableInsert, colInsert, tableSelect, colSelect, condition);
          const insertOrderFDetail = await statement.insertSubQuery(tableInsertDetail,colInsertDetail,tableSelectDetail,colSelectDetail,condition);
        }
        sql`SET FOREIGN_KEY_CHECKS=0`.execute(db);
        await statement.removeData("ordDetail",condition)
        await statement.removeData("ord",condition)
        sql`SET FOREIGN_KEY_CHECKS=1`.execute(db);
      }
      responseMessage(res, 200, "Update status success");
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  };
}
