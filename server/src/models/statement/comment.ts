import { db } from "models/connect"

export default class CommentStatement{
    public getAll = async() => {
        return await db.selectFrom("comments")
        .selectAll()
        .orderBy("comments.dateComment desc")
        .orderBy("comments.idProduct desc")
        .execute()
    }
    public getByProduct = async(id:number) => {
        return await db.selectFrom("comments")
        .where("comments.idProduct","=",id)
        .orderBy("comments.dateComment desc")
        .execute()
    }
}