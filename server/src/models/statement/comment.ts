import { db } from "models/connect"

export default class CommentStatement {
    public getAll = async () => {
        return await db.selectFrom("comments")
            .selectAll()
            .orderBy("comments.dateComment desc")
            .orderBy("comments.idComment desc")
            .execute()
    }
    public getCountCommentByProduct = async(id:number) => {
        return await db.selectFrom("comments")
        .select((eb:any) => eb.fn.count("idComment").as("total"))
        .where("comments.idProduct","=",id)
        .execute()
    }
    public getByProduct = async (id: number, page?: number) => {
        const pageSize = 4
        const offset = ((page ? page : 1) * pageSize) - pageSize

        return await db.selectFrom("comments")
            .select<any>([
                "comments.idComment",
                "comments.idProduct",
                "comments.commentValue",
                "comments.dateComment",
                "u.nameUser",
                "u.img"
            ])
            .where("comments.idProduct", "=", id)
            .leftJoin("users as u","u.idUser","comments.idUser")
            .orderBy("comments.dateComment","desc")
            .orderBy("comments.idComment","desc")
            .limit(pageSize)
            .offset(offset)
            .execute()
    }
}