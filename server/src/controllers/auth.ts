import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import AuthStatement from "models/statement/auth";
import Statements, { type ConditionType } from "models/statement/statement";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { responseData, responseMessage, responseMessageData } from "utils/response";
import { convertData, convertMultiData } from "utils/utils";
import type { RequestCustom } from "types/types";

const authStatement = new AuthStatement();
const statement = new Statements();

const createToken = (idUser: string, expired: string) => {
  console.log(idUser)
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
const handleRegister = async (username: string, password?: string, email?: string) => {
  const arrData = [
    {
      idUser: username,
      username: username,
      password_hash: password,
      status: "activated",
    },
  ];
  const info = [
    {
      idUser: username,
      nameUser: username,
      email: email,
    },
  ];
  const condition: ConditionType = {
    conditionName: "idUser",
    conditionMethod: "=",
    value: "username",
  };
  const authData = convertData(arrData);
  const infoData = convertData(info);
  const [resultAuth,resultInfo] = await Promise.all([
    statement.insertData("auth", authData),
    statement.insertData("users", infoData)
  ])
  if (!resultAuth) {
    await statement.removeData("users", condition);
    return false;
  }
  if (!resultInfo) {
    await statement.removeData("auth", condition);
    return false;
  }
  return true;
};

export default class AuthController {
  public login = async (req: Request, res: Response) => {
    const data = req.body;
    const username = data.username ? data.username : data.email;
    const password = data.password ? data.password : "";
    let isPassword: boolean | string = "";
    try {
      const result = await authStatement.getAuth(username);
      if (data.username && !result) {
        return responseMessage(res, 401, "Username does not exist");
      }
      if (data.email && !result) {
        const encode = encodePass(data.email);
        const split = data.email.split("@")[0];
        const regis = handleRegister(split, encode, data.email);
        if (!regis) {
          return responseMessage(res, 401, "Login false");
        }
      }
      const password_hash = result[0].password_hash;
      isPassword = data.username ? bcrypt.compareSync(password, password_hash) : "";
      if (isPassword !== "" && !isPassword) {
        return responseMessage(res, 401, "Incorrect password");
      }
      const { token: accessToken, expiredToken: expiredA } = createToken(result[0].idUser, "600s");
      const { token: refreshToken, expiredToken: expiredR } = createToken(result[0].idUser, "5d");
      const condition: ConditionType = {
        conditionName: "idUser",
        conditionMethod: "=",
        value: result[0].idUser,
      };
      await statement.updateDataByCondition("auth", [{ nameCol: "rfToken", value: refreshToken }], condition);
      responseData(res, 200, { accessToken, refreshToken, expiredA, expiredR });
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  };
  public logout = async (request:Request,res:Response) => {
    const req = request as RequestCustom
    const idUser = req.idUser
  }
  public register = async (req: Request, res: Response) => {
    const data = req.body;
    const username = data.username;
    const password = data.password;
    const email = data.email;
    try {
      const [dataAuth,dataMail] = await Promise.all([
        authStatement.getAuth(username),
        authStatement.getMail(email)
      ])
      if (dataAuth.length !== 0) {
        return responseMessage(res, 401, "Username is already taken!");
      }
      if (dataMail.length !== 0) {
        return responseMessage(res, 401, "Email is already taken!");
      }
      const newPassword = encodePass(password);
      const regis = await handleRegister(username, newPassword, email);
      if (!regis) {
        return responseMessage(res, 401, "Registration failed");
      }
      responseMessage(res, 201, "Register is success");
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  };
  public password = async (request: Request, res: Response) => {
    const req = request as RequestCustom;
    const idUser = req.idUser;
    const data = req.body;
    try {
      const checkPass = await authStatement.getPassword(idUser)
      const isPassword = bcrypt.compareSync(data.current, checkPass[0].password_hash)
      if(!checkPass){
        return responseMessage(res,401,'User does not exist');
      }
      if(!isPassword){
        return responseMessage(res,401,'Incorrect current password')
      }
      const newPassword = encodePass(data.password);
      const passData = [
        {
          password_hash: newPassword,
        },
      ];
      const condition: ConditionType = {
        conditionName: "idUser",
        conditionMethod: "=",
        value: idUser,
      };
      const result = await statement.updateDataByCondition("auth", convertData(passData), condition);
      if (!result) {
        return responseMessage(res, 401, "Password update failed");
      }
      responseMessage(res, 200, "Update password is success");
    } catch {
      (errors: any) => {
        responseMessageData(res, 500, "Server errors", errors);
      };
    }
  };
  public newToken = async (request: Request, res: Response) => {
    const req = request as RequestCustom;
    const idUser = req.idUser;
    const { token: accessToken, expiredToken: expiredA } = createToken(idUser, "600s");
    responseData(res, 200, { accessToken, expiredA });
  };
  public forgot = async () => {};
}
