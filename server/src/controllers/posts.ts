import type { Request, Response } from "express";
import PostStatement from "models/statement/posts";
import Statements, { type ConditionType } from "models/statement/statement";
import jsdom from "jsdom";
import { responseData, responseMessageData } from "utils/response";
import { convertData, handleChangeData, handleFindData } from "utils/utils";
import type { RequestCustom } from "types/types";

const { JSDOM } = jsdom;
const statement = new Statements();
const postStatement = new PostStatement();
export default class PostsController {
  public getAll = async (req: Request, res: Response) => {
    try {
      const result = await postStatement.getAll();
      const formatData = result.map((p: any) => {
        let dom = new JSDOM(p.valuesPosts);

        let firstHeadingOrParagraph = dom.window.document.querySelector("h1, h2, h3, p")?.textContent;

        let firstImgSrc = dom.window.document.querySelector("img")?.getAttribute("src");
        return {
          ...p,
          dateAdded: p.dateAdded.split("-").reverse().join("/"),
          title: firstHeadingOrParagraph,
          banner: firstImgSrc,
        };
      });
      responseData(res,200,formatData)
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  };
  public getCategory = async (req: Request, res: Response) => {
    handleFindData(res,postStatement.getCategory())
  };
  public getDetail = async (req:Request,res:Response) => {
    const idPosts = req.params["id"]
    handleFindData(res,postStatement.getDetail(Number(idPosts)))
  }
  public insertPost = async (request: Request, res: Response) => {
    const req = request as RequestCustom
    const idUser = req.idUser 
    const data = req.body
    const addData = data.map((p:any) => {
        return {
            ...p,
            poster:idUser
        }
    })
    const changeData = convertData(addData)
    handleChangeData("res",statement.insertData("posts",changeData),"add")

  };
  public updatePost = async (req: Request, res: Response) => {
    const data = req.body
    const changeData = convertData(data.detail)
    const condition:ConditionType = {
        conditionName:"idPosts",
        conditionMethod:"=",
        value:data.id
    }
    handleChangeData(res,statement.updateDataByCondition("posts",changeData,condition),"update")
  };
}
