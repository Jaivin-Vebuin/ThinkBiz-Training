import { Request, Response } from "express";
import { loginUserController } from "../../../src/interface/controllers/auth/users_login.controller";
import { userPort } from "../../../src/application/port/users_port";
import { loginUserUseCase } from "../../../src/application/use_cases/login_usecase";
import { displayResponseFunction } from "../../../src/infrastructure/helpers/other/response_display";
import { constants } from "../../../src/infrastructure/utility/constants";

jest.mock("../../src/application/use_cases/login_usecase");
jest.mock("../../src/infrastructure/helpers/other/response_display");

describe("loginUserController", () => {
  let mockUserRepo: jest.Mocked<userPort>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    mockUserRepo = {
      transactionWrapper: jest.fn(),
    } as unknown as jest.Mocked<userPort>;

    req = {
      body: { email: "test@example.com", password: "password123" },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it("should return success response when login is successful", async () => {
    const mockToken = "mockJwtToken";
    mockUserRepo.transactionWrapper.mockImplementation(async (callback) =>
      callback({} as any)
    );
    (loginUserUseCase as jest.Mock).mockResolvedValue(mockToken);

    await loginUserController(mockUserRepo)(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(constants.SUCCESS_STATUS.OK);
    expect(res.send).toHaveBeenCalledWith({
      message: constants.SUCCESS_MESSAGE.AUTHENTICATION_SUCCESSFUL,
      token: mockToken,
    });
  });

  it("should return authentication failed response when login fails", async () => {
    const authError = new Error(constants.ERROR_MESSAGE.AUTHENTICATION_FAILED);
    mockUserRepo.transactionWrapper.mockImplementation(async (callback) =>
      callback({} as any)
    );
    (loginUserUseCase as jest.Mock).mockRejectedValue(authError);

    await loginUserController(mockUserRepo)(req as Request, res as Response);

    expect(displayResponseFunction).toHaveBeenCalledWith(
      constants.ERROR_STATUS.AUTHENTICATION_FAILED,
      res,
      constants.ERROR_MESSAGE.AUTHENTICATION_FAILED
    );
  });

  it("should return internal server error for unexpected errors", async () => {
    const unknownError = new Error("Unexpected error");
    mockUserRepo.transactionWrapper.mockImplementation(async (callback) =>
      callback({} as any)
    );
    (loginUserUseCase as jest.Mock).mockRejectedValue(unknownError);

    await loginUserController(mockUserRepo)(req as Request, res as Response);

    expect(displayResponseFunction).toHaveBeenCalledWith(
      constants.ERROR_STATUS.INTERNAL_SERVER_ERROR,
      res,
      constants.ERROR_MESSAGE.INTERNAL_SERVER_ERROR
    );
  });
  
});
