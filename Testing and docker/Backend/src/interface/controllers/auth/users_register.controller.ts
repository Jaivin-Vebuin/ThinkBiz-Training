import { Request, Response } from "express";
import { userPort } from "../../../application/port/users_port";
import { EntityManager } from "typeorm";
import { registerUserUsecase } from "../../../application/use_cases/register_usecase";
import { displayResponseFunction } from "../../../infrastructure/helpers/other/response_display";
import { constants } from "../../../infrastructure/utility/constants";

// Registration is creation
export const registerUserController =
  (userRepo: userPort) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;
      await userRepo.transactionWrapper(
        async (transactionEntityManager: EntityManager) => {
          await registerUserUsecase(
            userRepo,
            userData,
            transactionEntityManager
          );
        }
      );

      displayResponseFunction(
        constants.SUCCESS_STATUS.CREATED,
        res,
        constants.SUCCESS_MESSAGE.USER_ADDED
      );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === constants.ERROR_MESSAGE.USER_ALREADY_EXISTS) {
          displayResponseFunction(
            constants.ERROR_STATUS.CONFLICT,
            res,
            constants.ERROR_MESSAGE.USER_ALREADY_EXISTS
          );
        }
      }else{
        displayResponseFunction(
          constants.ERROR_STATUS.INTERNAL_SERVER_ERROR,
          res,
          constants.ERROR_MESSAGE.INTERNAL_SERVER_ERROR
        );
      }
    }
  };
