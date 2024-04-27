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
    const resultLengthMulti = data.map(d => eval(`({
      ${d.map(c => `${c.nameCol}:${typeof c.value === "string" ? `"${c.value}"` : c.value}`)}
    })`))
    return await db
      .insertInto(table)
      .values(resultLengthMulti)
      .executeTakeFirst();
  };
  //insert data with select from table
  public insertSubQuery = async (fromTable: string, colInsert: string[], toTable: string, colQuery: string[]) => {
    return await db
      .insertInto(toTable)
      .columns(colInsert)
      .expression((eb: any) => eb.selectFrom(fromTable).select(colQuery))
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
  public removeData = async(table:string,condition:ConditionType) => {
    return await db.deleteFrom(table)
    .where(condition.conditionName,condition.conditionMethod,condition.value)
    .executeTakeFirst()
  }
  public tableChange = (method: "add" | "remove") => {};
  //update table detail, add new column, remove column
  public columnChange = (method: "add" | "remove", table: string, column: string, datatypes?: string) => {};
}
