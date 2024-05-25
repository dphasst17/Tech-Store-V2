import { db } from "models/connect"

export default class PostStatement{
    public getAll = async() => {
        return await db.selectFrom("posts as p")
        .select(["idPost","p.idType","t.nameType","dateAdded","p.title","p.thumbnails","valuesPosts","poster"])
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
        return await db.selectFrom("posts as p")
        .innerJoin("typePost as t","p.idType","t.idType")
        .select(["idPost","p.idType","t.nameType","dateAdded","p.title","p.thumbnails","valuesPosts","poster"])
        .where("idPost","=",id)
        .execute()
    }
    public getCommentByPost = async(idPost:number) => {
        return await db.selectFrom("commentPost as cp")
        .select(["cp.id","cp.idUser","users.nameUser","users.img","cp.idPost","cp.created_date","cp.commentValue"])
        .leftJoin("users","users.idUser","cp.idUser")
        .where("cp.idPost","=",idPost)
        .orderBy("cp.created_date desc")
        .execute()
    }
    public getCountCommentByPost = async(idPost:number) => {
        return await db.selectFrom("commentPost as cp")
        .select((eb:any) => eb.fn.count("id").as("total"))
        .where("cp.idProduct","=",idPost)
        .execute()
    }
}