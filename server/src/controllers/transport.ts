import type { Request, Response } from "express";
import Statements, { type ConditionType } from "models/statement/statement";
import TransportStatement from "models/statement/transport";
import type { RequestCustom } from "types/types";
import { responseData, responseMessage, responseMessageData } from "utils/response";
import { convertData, handleFindData } from "utils/utils";
import crypto from "crypto";
import { sql } from "kysely";
import { db } from "models/connect";

const transports = new TransportStatement();
const statement = new Statements();
let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1;
let year = dateObj.getUTCFullYear();
const randomText = (length: number) => {
  return crypto.randomBytes(length).toString("hex");
};
export default class TransportController {
  public getAll = async () => {};
  public getByUser = async (request: Request, res: Response) => {
    const req = request as RequestCustom;
    const idUser = req.idUser;
    handleFindData(res, transports.getTransportByUser(idUser));
  };
  public insertTran = async (request: Request, res: Response) => {
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
      const insert = await trx
      .insertInto("transports")
      .values(addData[0])
      .executeTakeFirst();
      
      const setFk = sql`SET FOREIGN_KEY_CHECKS=0`.execute(trx)
      const insertDetail = await trx
      .insertInto("transDetail")
      .columns(["idTrans", "idProduct", "countProduct", "discount", "status"])
      .expression((eb: any) =>
        eb
          .selectFrom("carts")
          .select([
            sql`${idTrans}`,
            "carts.idProduct",
            "countProduct",
            sql`IF(sale.end_date >= CURDATE() AND sale.start_date <= CURDATE(), IFNULL(sd.discount, 0), 0)`.as(
              "discount"),
            sql`"Chờ xác nhận"`
          ])
          .leftJoin("products as p", "p.idProduct", "carts.idProduct")
          .leftJoin("saleDetail as sd", "p.idProduct", "sd.idProduct")
          .leftJoin("sale", "sd.idSale", "sale.idSale")
          .where("carts.idCart", "in", data.listId)
      )
      .execute();
      const rmFk = sql`SET FOREIGN_KEY_CHECKS=1`.execute(trx)
      console.log("end")
      return {insert,setFk,insertDetail,rmFk}
    });
    if(!insertData.insertDetail[0].insertId){
      return responseMessage(res,401,'Order failed')
    }
    responseMessage(res,201,"Order success")
  };
}
