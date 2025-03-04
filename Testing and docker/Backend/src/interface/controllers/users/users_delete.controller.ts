import { Request, Response } from "express";
import { deleteUserUseCase } from "../../../application/use_cases/delete_usecase";
import { userPort } from "../../../application/port/users_port";
import { EntityManager } from "typeorm";
import { displayResponseFunction } from "../../../infrastructure/helpers/other/response_display";
import { constants } from "../../../infrastructure/utility/constants";

export const deleteUserByIDController =
  (userRepo: userPort) => async (req: Request, res: Response) => {
    try {
      const tokenData: {} = {
        deleteUserID: parseInt(req.query.id as string),
        current_role: res.locals.user.role,
        current_id: res.locals.user.id,
      };

      await userRepo.transactionWrapper(
        async (transactionEntityManager: EntityManager) => {
          return await deleteUserUseCase(
            userRepo,
            tokenData,
            transactionEntityManager
          );
        }
      );

      displayResponseFunction(
        constants.SUCCESS_STATUS.OK,
        res,
        constants.SUCCESS_MESSAGE.REQUEST_SUCCEEDED
      );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === constants.ERROR_MESSAGE.USER_NOT_FOUND) {
          displayResponseFunction(
            constants.ERROR_STATUS.NOT_FOUND,
            res,
            constants.ERROR_MESSAGE.USER_NOT_FOUND
          );
        } else if (error.message === constants.ERROR_MESSAGE.INVALID_INPUT) {
          displayResponseFunction(
            constants.ERROR_STATUS.BAD_REQUEST,
            res,
            constants.ERROR_MESSAGE.INVALID_INPUT
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
