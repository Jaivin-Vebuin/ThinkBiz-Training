import { EntityManager } from "typeorm";
import { userPort } from "../port/users_port";
import { constants } from "../../infrastructure/utility/constants";
import { updateUserType } from "../../domain/model/users_model";
import bcrypt from 'bcrypt';

export const updateUserUseCase = async (
  userRepo: userPort,
  tokenData: { [key: string]: string | number },
  updationData: updateUserType,
  entityManager: EntityManager
) => {
  const isExisted = await userRepo.getUserPort(
    entityManager,
    tokenData.updateUserID as number,
    undefined
  );

  if (!isExisted.length) {
    throw new Error(constants.ERROR_MESSAGE.USER_NOT_FOUND);
  } else {
    if (tokenData.current_id === isExisted[0].id) {
      if(updationData.password){
        const saltRound = 10;
        updationData.password = await bcrypt.hash(updationData.password,saltRound);
      }
      return await userRepo.updateUserPort(
        entityManager,
        updationData,
        tokenData.updateUserID as number
      );
    } else {
      throw new Error(constants.ERROR_MESSAGE.INVALID_ACCESS);
    }
  }
};
