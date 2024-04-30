import type { Request, Response } from "express";
import CommentStatement from "models/statement/comment";
import Statements from "models/statement/statement";
import type { RequestCustom } from "types/types";
import { convertData, handleChangeData, handleFindData } from "utils/utils";

const statement = new Statements()
const commentStatement = new CommentStatement()
export default class CommentController{
    public getAll = async(req:Request,res:Response) => {
        handleFindData(res,commentStatement.getAll())
    }
    public getByProduct = async(req:Request,res:Response) => {
        const idProduct = req.params["id"]
        handleFindData(res,commentStatement.getByProduct(Number(idProduct)))
    }
    public insertComment = async(request:Request,res:Response) => {
        const req = request as RequestCustom
        const data = req.body;
        const idUser = req.idUser
        const dataInsert = data.comment.map((c:any) => {
            return {
                ...c,
                idUser:idUser
            }
        })
        const formatData = convertData(dataInsert)
        handleChangeData(res,statement.insertData("comments",formatData),"add")
    }
    public editComment = async(req:Request,res:Response) => {}
    public removeComment = async(req:Request,res:Response) => {
        
    }
}
