import { sql } from "kysely";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/mysql";
import { db } from "models/connect";

export default class UserStatement {
  public getUser = async (idUser: string) => {
    return await db
      .selectFrom("users")
      .select<any>((eb: any) => [
        "idUser",
        "nameUser",
        "phone",
        "email",
        jsonArrayFrom(
            eb.selectFrom("carts")
            .select((c: any) => [
              "idCart",
              "idProduct",
              "countProduct",
      
              jsonArrayFrom(
                c
                  .selectFrom("products as p")
                  .select([
                    "nameProduct",
                    "imgProduct",
                    "price",
                    sql`IF(sale.end_date >= CURDATE() AND sale.start_date <= CURDATE(), IFNULL(sd.discount, 0), 0)`.as(
                      "discount"
                    ),
                  ])
                  .leftJoin("saleDetail as sd", "p.idProduct", "sd.idProduct")
                  .leftJoin("sale", "sd.idSale", "sale.idSale")
                  .whereRef("carts.idProduct", "=", "p.idProduct")
              ).as("detail"),
            ])
            .where("carts.idUser", "=", idUser)
        ).as("cart"),
        jsonArrayFrom(
          eb
            .selectFrom("userAddress as ua")
            .select(["ua.idAddress", "ua.typeAddress as type", "ua.detail"])
            .whereRef("ua.idUser", "=", "users.idUser")
        ).as("address"),
      ])
      .where("users.idUser", "=", `${idUser}`)
      .execute();
  };
}
