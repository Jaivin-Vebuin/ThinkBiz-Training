import { Request, Response } from "express";
import { loginUserUseCase } from "../../../application/use_cases/login_usecase";
import { userPort } from "../../../application/port/users_port";
import { userLoginType } from "../../../domain/model/users_model";
import { EntityManager } from "typeorm";
import { displayResponseFunction } from "../../../infrastructure/helpers/other/response_display";
import { constants } from "../../../infrastructure/utility/constants";

export const loginUserController =
  (userRepo: userPort) =>
  async (req: Request, res: Response): Promise<void> => {
    try {
      const loginData: userLoginType = req.body;
      const token = await userRepo.transactionWrapper(
        async (transactionEntityManager: EntityManager) => {
          return await loginUserUseCase(
            userRepo,
            loginData,
            transactionEntityManager
          );
        }
      );
      res.status(constants.SUCCESS_STATUS.OK).send({
        message: constants.SUCCESS_MESSAGE.AUTHENTICATION_SUCCESSFUL,
        token: token,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === constants.ERROR_MESSAGE.AUTHENTICATION_FAILED) {
          displayResponseFunction(
            constants.ERROR_STATUS.AUTHENTICATION_FAILED,
            res,
            constants.ERROR_MESSAGE.AUTHENTICATION_FAILED
          );
        } else {
          displayResponseFunction(
            constants.ERROR_STATUS.INTERNAL_SERVER_ERROR,
            res,
            constants.ERROR_MESSAGE.INTERNAL_SERVER_ERROR
          );
        }
      } else {
        displayResponseFunction(
          constants.ERROR_STATUS.INTERNAL_SERVER_ERROR,
          res,
          constants.ERROR_MESSAGE.INTERNAL_SERVER_ERROR
        );
      }
    }
  };
