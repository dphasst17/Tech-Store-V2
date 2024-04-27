import jwt from 'jsonwebtoken';
import type { Request,Response,NextFunction } from "express";
import type { RequestCustom } from 'types/types';

export const verifyToken = (request:Request,res:Response,next:NextFunction) => {
    const req = request as RequestCustom
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) return res.sendStatus(401);
    const token = authorizationHeader.split(" ")[1];
    if (!token) res.status(401).json({status:401,message:"Invalid token"});
    jwt.verify(token, process.env.SECRET_KEY as string, (err:any, data:any) => {
        if (err) res.sendStatus(403);
        req.idUser = data.id;
        next();
    });
}