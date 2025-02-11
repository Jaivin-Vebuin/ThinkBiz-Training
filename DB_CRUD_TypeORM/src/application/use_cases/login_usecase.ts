import jwt, { JwtPayload } from "jsonwebtoken";
import { userPort } from "../port/users_port";
import { userCredentialsType, userInfoType, userLoginType } from "../../domain/model/users_model";
import { EntityManager } from "typeorm";
import { constants } from "../../infrastructure/utility/constants";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const loginUserUseCase = async (
  userRepo: userPort,
  loginData: userLoginType,
  entityManager: EntityManager
): Promise<string> => {

  const validUser: userCredentialsType[] = await userRepo.getCredentialsPort(
    entityManager,
    loginData.email
  );

  if (!validUser.length) {
    throw new Error(constants.ERROR_MESSAGE.INVALID_CREDENTIALS);
  }

  const storedPassword = validUser[0].password as string;
  const jwtSecret = process.env.JWT_SECRET as string;
  const isValidPassword = await bcrypt.compare(
    loginData.password,
    storedPassword
  );

  if (!isValidPassword) {
    throw new Error(constants.ERROR_MESSAGE.INVALID_CREDENTIALS);
  }

  const token = jwt.sign(
    { id: validUser[0].id, role: validUser[0].role },
    jwtSecret,
    { expiresIn: "1h" }
  );

  return token;
};
