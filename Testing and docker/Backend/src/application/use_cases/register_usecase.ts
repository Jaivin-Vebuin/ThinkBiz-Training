import { EntityManager } from "typeorm";
import { userInfoType } from "../../domain/model/users_model";
import { userPort } from "../port/users_port";
import { constants } from "../../infrastructure/utility/constants";
import bcrypt from "bcrypt";

export const registerUserUsecase = async (
  userRepo: userPort,
  userData: userInfoType,
  entityManager: EntityManager
) => {
  const alreadyExisted = await userRepo.getUserPort(
    entityManager,
    undefined,
    userData.email
  );

  if (alreadyExisted.length) {
    throw new Error(constants.ERROR_MESSAGE.USER_ALREADY_EXISTS);
  } else {
    const saltRound = 10;
    const password = userData.password as string;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    userData.password = hashedPassword;
    await userRepo.registerUserPort(userData, entityManager);
  }
};
