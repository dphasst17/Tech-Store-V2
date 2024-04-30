import { db } from "models/connect"

export default class PostStatement{
    public getAll = async() => {
        return await db.selectFrom("posts as p")
        .select(["idPosts","p.idType","t.nameType","dateAdded","valuePosts","poster"])
        .innerJoin("typePost as t","p.idType","t.idType")
        .orderBy("dateAdded desc")
        .execute()
    }
    public getCategory = async() => {
        return await db.selectFrom("typePost")
        .selectAll()
        .execute()
    }
    public getDetail = async(id:number) => {
        return await db.selectFrom("posts")
        .innerJoin("typePost as t","p.idType","t.idType")
        .select(["idPosts","p.idType","t.nameType","dateAdded","valuePosts","poster","create_at","update_at"])
        .where("idPosts","=",id)
        .execute()
    }
}