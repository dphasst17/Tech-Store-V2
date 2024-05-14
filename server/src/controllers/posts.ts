import type { Request, Response } from "express";
import PostStatement from "models/statement/posts";
import Statements, { type ConditionType } from "models/statement/statement";
import { responseData, responseMessageData } from "utils/response";
import { convertData, handleChangeData, handleFindData } from "utils/utils";
import type { RequestCustom } from "types/types";


const statement = new Statements();
const postStatement = new PostStatement();
export default class PostsController {
  public getAll = async (req: Request, res: Response) => {
    try {
      const result = await postStatement.getAll();
      responseData(res, 200, result);
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  };
  public getCategory = async (req: Request, res: Response) => {
    handleFindData(res, postStatement.getCategory());
  };
  public getDetail = async (req: Request, res: Response) => {
    const idPosts = req.params["id"];
    handleFindData(res, postStatement.getDetail(Number(idPosts)));
  };
  public insertPost = async (request: Request, res: Response) => {
    const req = request as RequestCustom;
    const idUser = req.idUser;
    const data = req.body;
    const addData = data.map((p: any) => {
      return {
        ...p,
        poster: idUser,
      };
    });
    const changeData = convertData(addData);
    handleChangeData("res", statement.insertData("posts", changeData), "add");
  };
  public updatePost = async (req: Request, res: Response) => {
    const data = req.body;
    const changeData = convertData(data.detail);
    const condition: ConditionType = {
      conditionName: "idPosts",
      conditionMethod: "=",
      value: data.id,
    };
    handleChangeData(res, statement.updateDataByCondition("posts", changeData, condition), "update");
  };
}
