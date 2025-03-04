import { Request, Response } from "express";
import { getUserUseCase } from "../../../application/use_cases/get_usecase";
import { userPort } from "../../../application/port/users_port";
import { EntityManager } from "typeorm";
import { displayResponseFunction } from "../../../infrastructure/helpers/other/response_display";
import { constants } from "../../../infrastructure/utility/constants";

export const getUserController =
  (userRepo: userPort) => async (req: Request, res: Response) => {
    try {
      const isAllData:number = parseInt(req.query.isAll as string);
      let userData: {[key:string]:string|number};

      if (res.locals.user.role === "admin") {
        userData = {
          id: res.locals.user.id,
          role: res.locals.user.role,
          isAllData,
        };
      } else {
        userData = {
          id: res.locals.user.id,
          role: res.locals.user.role,
        };
      }

      console.log(userData)

      const users = await userRepo.transactionWrapper(
        async (transactionEntityManager: EntityManager) => {
          return await getUserUseCase(
            userRepo,
            userData,
            transactionEntityManager
          );
        }
      );

      displayResponseFunction(constants.SUCCESS_STATUS.OK, res, users);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === constants.ERROR_MESSAGE.USER_NOT_FOUND) {
          displayResponseFunction(
            constants.ERROR_STATUS.NOT_FOUND,
            res,
            constants.ERROR_MESSAGE.USER_NOT_FOUND
          );
        }
      }
      displayResponseFunction(
        constants.ERROR_STATUS.INTERNAL_SERVER_ERROR,
        res,
        constants.ERROR_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  };
