import jwt from 'jsonwebtoken';
import type { Request,Response,NextFunction } from "express";
import type { RequestCustom } from 'types/types';
import { db } from 'models/connect';
import { responseMessage } from 'utils/response';

export const verifyToken = (request:Request,res:Response,next:NextFunction) => {
    const req = request as RequestCustom
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) return res.sendStatus(401);
    const token = authorizationHeader.split(" ")[1];
    if (!token) res.status(401).json({status:401,message:"Invalid token"});
    jwt.verify(token, process.env.SECRET_KEY as string, async (err:any, data:any) => {
        if (err) res.sendStatus(403);
        const isLogin = await db.selectFrom("auth")
        .select(["auth.status","auth.rfToken"])
        .where("auth.idUser","=",data.id)
        .execute()
        if(isLogin[0].status !== "login" && isLogin[0].rfToken === ""){
            return responseMessage(res,401,'User is logged out')
        }
        req.idUser = data.id;
        next();
    });
}