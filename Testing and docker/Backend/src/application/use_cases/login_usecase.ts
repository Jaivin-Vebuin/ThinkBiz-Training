import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userPort } from "../port/users_port";
import {
  userCredentialsType,
  userLoginType,
} from "../../domain/model/users_model";
import { EntityManager } from "typeorm";
import { constants } from "../../infrastructure/utility/constants";

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
    throw new Error(constants.ERROR_MESSAGE.AUTHENTICATION_FAILED);
  }

  const storedPassword = validUser[0]?.password;
  if (!storedPassword) {
    throw new Error(constants.ERROR_MESSAGE.AUTHENTICATION_FAILED);
  }

  const isValidPassword = await bcrypt.compare(
    loginData.password,
    storedPassword
  );
  if (!isValidPassword) {
    throw new Error(constants.ERROR_MESSAGE.AUTHENTICATION_FAILED);
  }

  const jwtSecret = process.env.JWT_SECRET as string;

  const token = jwt.sign(
    { id: validUser[0].id, role: validUser[0].role },
    jwtSecret,
    { expiresIn: "1h" }
  );

  return token;
};
