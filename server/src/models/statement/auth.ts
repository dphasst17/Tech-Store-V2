import { db } from "models/connect"

export default class AuthStatement{
    public getAuth = async(username:string) => {
        return await db.selectFrom('auth')
        .select(["idUser","username","password_hash","role"])
        .where('username','=',`${username}`)
        .execute()
    }
    public getMail = async(email:string) => {
        return await db.selectFrom('user')
        .select(["email"])
        .where('email','=',email)
        .execute()
    }
}