import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/mysql";
import { db } from "models/connect";

export default class OrderStatement {
  public getAllOrder = async () => {};
  public getOrderByUser = async (idUser: string) => {
    return await db
      .selectFrom("ord as t")
      .select<any>((eb: any) => [
        "t.idTrans",
        "idShipper",
        "idUser",
        "fullName",
        "phone",
        "address",
        "method",
        "costs",
        "edd",
        "paymentStatus",
        "orderStatus",
        jsonArrayFrom(
          eb
            .selectFrom("ordDetail as td")
            .select((c:any) => [
                "idTransDetail", "idProduct", "countProduct", "discount", "status",
                jsonObjectFrom(
                    c.selectFrom("products")
                    .select(["nameProduct","price","imgProduct"])
                    .whereRef("td.idProduct","=","products.idProduct")
                ).as("info")
            ])
            .whereRef("td.idTrans", "=", "t.idTrans")
        ).as("detail")
      ])
      .where("idUser", "=", `${idUser}`)
      .execute();
  };
  public getTransportDetail = async () => {};
}
