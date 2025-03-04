import { EntityManager } from "typeorm";
import data_source from "../../typeorm/config/data_source";

export const transactionWrapper = async <T>(
  transactionFunction: (transactionEntityManager: EntityManager) => Promise<T>
): Promise<T> => {
  return await data_source.transaction((entityManager) => {
    return transactionFunction(entityManager);
  });
};
