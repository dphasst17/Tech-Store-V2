import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import AuthStatement from "models/statement/auth";
import Statements, { type ConditionType } from "models/statement/statement";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { responseData, responseMessage } from "utils/response";
import { convertData,convertMultiData } from "utils/utils";
import type { RequestCustom } from "types/types";

const createToken = (idUser: string, expired: string) => {
  const token = jwt.sign({ id: idUser }, process.env.SECRET_KEY as string, { expiresIn: expired });
  const { exp: expiredToken } = jwt.decode(token) as jwt.JwtPayload;
  return { token, expiredToken };
};
const createPass = (length: number) => {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
};
const encodePass = (password: string) => {
  const saltRound = 10;
  const salt = bcrypt.genSaltSync(saltRound);
  return bcrypt.hashSync(password, salt);
};
const handleRegister = async(username:string,password?:string,email?:string) => {
    const arrData = [
        {
            idUser:username,
            username:username,
            password_hash:password,
            status:'activated'
        }
    ]
    const info = [
        {
            idUser:username,
            nameUser:username,
            email:email
        }
    ]
    const condition:ConditionType = {
        conditionName:"idUser",
        conditionMethod:"=",
        value:"username"
    }
    const authData = convertData(arrData)
    const infoData = convertData(info)
    const resultAuth = await statement.insertData('auth',authData)
    const resultInfo = await statement.insertData('users',infoData)
    if(!resultAuth){
        await statement.removeData("users",condition)
        return false
    }
    if(!resultInfo){
        await statement.removeData("auth",condition)
        return false
    }
    return true
}
const authStatement = new AuthStatement();
const statement = new Statements()
export default class AuthController {
  public login = async (req: Request, res: Response) => {
    const data = req.body;
    const username = data.username ? data.username : data.email;
    const password = data.password ? data.password : "";
    let isPassword: boolean | string = "";
    
    const result = await authStatement.getAuth(username);
    if (data.username && !result) {
        return responseMessage(res, 401, "Username does not exist");
    }
    if(data.email && !result){
        const encode = encodePass(data.email)
        const split = data.email.split("@")[0]
        const regis = handleRegister(split,encode,data.email)
        if(!regis){
            return responseMessage(res,401,'Login false')
        }
    }
    const password_hash = result[0].password_hash;
    isPassword = data.username ? bcrypt.compareSync(password, password_hash): "";
    if (isPassword !== "" && !isPassword) {
        return responseMessage(res, 401, "Incorrect password");
    }
    const {token:accessToken,expiredToken:expiredA} = createToken(result[0].idUser,"600s")
    const {token:refreshToken,expiredToken:expiredR} = createToken(result[0].idUser,"600s")
    const condition:ConditionType={
        conditionName:"idUser",
        conditionMethod:"=",
        value:result[0].idUser
    }
    await statement.updateDataByCondition('auth',[{nameCol:'rfToken',value:refreshToken}],condition)
    responseData(res,200,{accessToken,refreshToken,expiredA,expiredR})
  };
  public register = async (req: Request, res: Response) => {
    const data = req.body;
    const username = data.username;
    const password = data.password;
    const email = data.email;
    const getAuth = await authStatement.getAuth(username);
    const getMail = await authStatement.getMail(email)
    if(getAuth.length !== 0){
        return responseMessage(res,401,'Username is already taken!');
    }
    if(getMail.length !== 0){
        return responseMessage(res,401,'Email is already taken!');
    }
    const newPassword = encodePass(password)
    const regis = handleRegister(username,newPassword,email)
    if(!regis){
        return responseMessage(res,401,'Registration failed')
    }
    responseMessage(res,201,"Register is success")
  };
  public password = async (request: Request, res: Response) => {
    const req = request as RequestCustom
    const idUser = req.idUser;
    const data = req.body;
    const newPassword = encodePass(data.password)
    const passData = [
        {
            password_hash:newPassword
        }
    ]
    const condition:ConditionType = {
        conditionName:"idUser",
        conditionMethod:"=",
        value:idUser
    }
    const result = await statement.updateDataByCondition('auth',convertData(passData),condition)
    if(!result){
        return responseMessage(res,401,'Password update failed')
    }
    responseMessage(res,200,'Update password is success')
  };
  public newToken = async(request: Request, res: Response) => {
    const req = request as RequestCustom;
    const idUser = req.idUser
    const {token:accessToken,expiredToken:expiredA} = createToken(idUser,"600s")
    responseData(res,200,{accessToken,expiredA})
  }
  public forgot = async() => {}
}
