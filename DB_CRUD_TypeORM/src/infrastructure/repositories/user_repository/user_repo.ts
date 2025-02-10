import { userPort } from "../../../application/port/users_port";
import {
  userCredentialsType,
  userInfoType,
} from "../../../domain/model/users_model";
import { transactionWrapper } from "../../helpers/other/transactions";
import t_user from "../../typeorm/entity/user_entity";

export const UserRepository: userPort = {
  registerUserPort: async (userData, entityManager) => {
    await entityManager.getRepository(t_user).save(userData);
  },

  getUserPort: async (
    entityManager,
    userID,
    email
  ): Promise<userInfoType[]> => {
    const result: userInfoType[] = await entityManager
      .getRepository(t_user)
      .createQueryBuilder()
      .select("id,name,email,role,age")
      .where(userID ? "id = :id" : "true", { id: userID })
      .andWhere(email ? { email: email } : "true")
      .getRawMany();
    return result;
  },

  getCredentialsPort: async (
    entityManager,
    email
  ): Promise<userCredentialsType[]> => {
    const result: userCredentialsType[] = await entityManager
      .getRepository(t_user)
      .createQueryBuilder()
      .select("id,role,password")
      .where({ email: email })
      .getRawMany();

    return result;
  },

  deleteUserPort: async (entityManager, deleteUserID): Promise<void> => {
    await entityManager
      .getRepository(t_user)
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id: deleteUserID })
      .execute();

    return;
  },

  updateUserPort: async (
    entityManager,
    updateUserData,
    updateUserID
  ): Promise<void> => {
    await entityManager
      .createQueryBuilder()
      .update(t_user)
      .set(updateUserData)
      .where("id = :id", { id: updateUserID })
      .execute();

    return;
  },

  transactionWrapper,
};
