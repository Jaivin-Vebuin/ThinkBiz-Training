import { EntityManager } from "typeorm";
import { userPort } from "../port/users_port";
import { constants } from "../../infrastructure/utility/constants";

export const deleteUserUseCase = async (
  userRepo: userPort,
  tokenData: { [key: string]: string | number },
  entityManager: EntityManager
) => {
  const isExisted = await userRepo.getUserPort(
    entityManager,
    tokenData.deleteUserID as number,
    undefined
  );

  if (!isExisted.length) {
    throw new Error(constants.ERROR_MESSAGE.USER_NOT_FOUND);
  } else {
    if (tokenData.current_role === "admin") {
      if (tokenData.current_id === isExisted[0].id) {
        return await userRepo.deleteUserPort(
          entityManager,
          tokenData.deleteUserID as number
        );
      } else if (
        tokenData.current_id !== isExisted[0].id &&
        isExisted[0].role === "user"
      ) {
        return await userRepo.deleteUserPort(
          entityManager,
          tokenData.deleteUserID as number
        );
      } else {
        throw new Error(constants.ERROR_MESSAGE.INVALID_INPUT);
      }
    } else {
      if (tokenData.current_id === isExisted[0].id) {
        return await userRepo.deleteUserPort(
          entityManager,
          tokenData.deleteUserID as number
        );
      } else {
        throw new Error(constants.ERROR_MESSAGE.INVALID_INPUT);
      }
    }
  }
};
