import { EntityManager } from "typeorm";
import {
  updateUserType,
  userCredentialsType,
  userInfoType,
} from "../../domain/model/users_model";

export type userPort = {
  registerUserPort(
    userData: userInfoType,
    entityManager: EntityManager
  ): Promise<void>;

  getUserPort(
    entityManager: EntityManager,
    userID?: number,
    email?: string
  ): Promise<userInfoType[]>;

  getCredentialsPort(
    entityManager: EntityManager,
    email: string
  ): Promise<userCredentialsType[]>;

  deleteUserPort(
    entityManager: EntityManager,
    deleteUserID: number
  ): Promise<void>;

  updateUserPort(
    entityManager:EntityManager,
    updateUserData: {[key:string]:number|string},
  ): Promise<void>;

  transactionWrapper: <T>(
    transactionFunction: (transactionEntityManager: EntityManager) => Promise<T>
  ) => Promise<T>;
};
