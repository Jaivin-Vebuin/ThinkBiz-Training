import { EntityManager } from "typeorm";
import { userPort } from "../port/users_port";
import { constants } from "../../infrastructure/utility/constants";
import { updateUserType } from "../../domain/model/users_model";
import bcrypt from "bcrypt";

export const updateUserUseCase = async (
  userRepo: userPort,
  updationData: { [key: string]: string | number },
  entityManager: EntityManager
) => {
  const isExisted = await userRepo.getUserPort(
    entityManager,
    updationData.updateUserID as number,
    undefined
  );

  if (!isExisted.length) {
    throw new Error(constants.ERROR_MESSAGE.USER_NOT_FOUND);
  } else {
    if (updationData.password) {
      const saltRound = 10;
      updationData.password = await bcrypt.hash(updationData.password as string,saltRound);
    }
    return await userRepo.updateUserPort(
      entityManager,
      updationData,
    );
  }
};
