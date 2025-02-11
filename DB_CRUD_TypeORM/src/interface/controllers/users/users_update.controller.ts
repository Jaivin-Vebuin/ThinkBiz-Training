import { Request, Response } from "express";
import { userPort } from "../../../application/port/users_port";
import { updateUserUseCase } from "../../../application/use_cases/update_usecase";
import { EntityManager } from "typeorm";
import { displayResponseFunction } from "../../../infrastructure/helpers/other/response_display";
import { constants } from "../../../infrastructure/utility/constants";

export const updateUserByIDController =
  (userRepo: userPort) => async (req: Request, res: Response) => {
    try {
      const updateUserID = parseInt(req.query.id as string);
      const current_id = res.locals.user.id;

      if (updateUserID !== current_id) {
        displayResponseFunction(
          constants.ERROR_STATUS.AUTHENTICATION_FAILED,
          res,
          constants.ERROR_MESSAGE.INVALID_ACCESS
        );
      } else {
        const updationData = { ...req.body, updateUserID };
        await userRepo.transactionWrapper(
          async (transactionEntityManager: EntityManager) => {
            return await updateUserUseCase(
              userRepo,
              updationData,
              transactionEntityManager
            );
          }
        );
        displayResponseFunction(
          constants.SUCCESS_STATUS.OK,
          res,
          constants.SUCCESS_MESSAGE.USER_UPDATED
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === constants.ERROR_MESSAGE.USER_NOT_FOUND) {
          displayResponseFunction(
            constants.ERROR_STATUS.NOT_FOUND,
            res,
            constants.ERROR_MESSAGE.USER_NOT_FOUND
          );
        }
        if (error.message === constants.ERROR_MESSAGE.INVALID_ACCESS) {
          displayResponseFunction(
            constants.ERROR_STATUS.BAD_REQUEST,
            res,
            constants.ERROR_MESSAGE.INVALID_ACCESS
          );
        }
      }
      res
        .status(constants.ERROR_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: constants.ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
    }
  };
