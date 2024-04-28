import { db } from "models/connect";
interface ValueType {
  nameCol: string;
  value: string | number;
}
export interface ConditionType {
  conditionName: string;
  conditionMethod: "=" | "!=" | ">=" | "<=" | "like" | "not like" | "in" | "not in";
  value: string | number | number[] | string[];
}
export default class Statements {
  //insert data
  public insertData = async (table: string, data: ValueType[]) => {
    const result = data.map((c) => `${c.nameCol}:${typeof c.value === "string" ? `"${c.value}"` : c.value}`).toString();
    return await db
      .insertInto(table)
      .values(eval(`({${result}})`))
      .executeTakeFirst();
  };
  //insert multi data
  public insertDataMulti = async (table: string, data: ValueType[][]) => {
    const resultLengthMulti = data.map((d) =>
      eval(`({
      ${d.map((c) => `${c.nameCol}:${typeof c.value === "string" ? `"${c.value}"` : c.value}`)}
    })`)
    );
    return await db.insertInto(table).values(resultLengthMulti).executeTakeFirst();
  };


  //insert data with select from table
  public insertSubQuery = async (
    tableInsert: string,
    colInsert: string[],
    tableSelect: string,
    colSelect: any[],
    condition: ConditionType,
    join?: any[],
  ) => {
    return await db
      .insertInto(tableInsert)
      .columns(colInsert)
      .expression((eb: any) => {
        let query: any = eb.selectFrom(tableSelect).select(colSelect);
        join && join.map((j: any) => (query = query.innerJoin(j.table, j.key1, j.key2)));
        return query.where(condition.conditionName, condition.conditionMethod, condition.value);
      })
      .execute();
  };


  public updateDataByCondition = async (table: string, data: ValueType[], condition: ConditionType) => {
    const result = data.map((c) => `${c.nameCol}:${typeof c.value === "string" ? `'${c.value}'` : c.value}`).toString();
    return await db
      .updateTable(table)
      .set(eval(`({${result}})`))
      .where(condition.conditionName, condition.conditionMethod, condition.value)
      .executeTakeFirst();
  };
  public removeData = async (table: string, condition: ConditionType) => {
    return await db
      .deleteFrom(table)
      .where(condition.conditionName, condition.conditionMethod, condition.value)
      .executeTakeFirst();
  };
  //this is code sql for create table or drop table
  public table = (method: "add" | "remove") => {};
  //update table : add column , change column or drop column
  public columnChange = (method: "add" | "remove", table: string, column: string, datatypes?: string) => {};
}
