import { EntityManager } from "typeorm";
import { userPort } from "../port/users_port";
import { constants } from "../../infrastructure/utility/constants";
import { userInfoType } from "../../domain/model/users_model";

export const getUserUseCase = async (
  userRepo: userPort,
  data: { [key: string]: string | number },
  entityManager: EntityManager
) => {
  const role = data.role;
  const id = data.id as number;

  let userData: userInfoType[];
  if (role === "admin") {
    if (data.isAllData) {
      userData = await userRepo.getUserPort(entityManager);
    } else {
      userData = await userRepo.getUserPort(entityManager, id);
    }
    return userData;
  } else if (role === "user") {
    userData = await userRepo.getUserPort(entityManager, id);
    return userData;
  } else {
    throw new Error(constants.ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
  }
};
