import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { loginUserUseCase } from "../../../src/application/use_cases/login_usecase";
import { userPort } from "../../../src/application/port/users_port";
import { constants } from "../../../src/infrastructure/utility/constants";
import { EntityManager } from "typeorm";

jest.mock("jsonwebtoken");
jest.mock("bcrypt");

describe("loginUserUseCase", () => {
  let mockUserRepo: jest.Mocked<userPort>;
  let mockEntityManager: jest.Mocked<EntityManager>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUserRepo = {
      getCredentialsPort: jest.fn(),
      transactionWrapper: jest.fn((callback) => callback(mockEntityManager)),
    } as unknown as jest.Mocked<userPort>;

    mockEntityManager = {} as jest.Mocked<EntityManager>;

    process.env.JWT_SECRET = "test_secret";
  });

  it("should return a JWT token when login is successful", async () => {
    const mockUser = [{ id: 1, email: "test@example.com", password: "hashedPassword", role: "user" }];
    mockUserRepo.getCredentialsPort.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("mocked_jwt_token");

    const loginData = { email: "test@example.com", password: "correctpassword" };

    const token = await loginUserUseCase(mockUserRepo, loginData, mockEntityManager);

    expect(token).toBe("mocked_jwt_token");
    expect(mockUserRepo.getCredentialsPort).toHaveBeenCalledWith(mockEntityManager, loginData.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(loginData.password, "hashedPassword");
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: 1, role: "user" },
      "test_secret",
      { expiresIn: "1h" }
    );
  });

  it("should throw an error when the user is not found", async () => {
    mockUserRepo.getCredentialsPort.mockResolvedValue([]);

    const loginData = { email: "nonexistent@example.com", password: "somepassword" };

    await expect(loginUserUseCase(mockUserRepo, loginData, mockEntityManager))
      .rejects.toThrow(constants.ERROR_MESSAGE.AUTHENTICATION_FAILED);

    expect(mockUserRepo.getCredentialsPort).toHaveBeenCalledWith(mockEntityManager, loginData.email);
    expect(bcrypt.compare).not.toHaveBeenCalled(); 
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  it("should throw an error when the password is incorrect", async () => {
    const mockUser = [{ id: 1, email: "test@example.com", password: "hashedPassword", role: "user" }];
    mockUserRepo.getCredentialsPort.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false); 

    const loginData = { email: "test@example.com", password: "wrongpassword" };

    await expect(loginUserUseCase(mockUserRepo, loginData, mockEntityManager))
      .rejects.toThrow(constants.ERROR_MESSAGE.AUTHENTICATION_FAILED);

    expect(mockUserRepo.getCredentialsPort).toHaveBeenCalledWith(mockEntityManager, loginData.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(loginData.password, "hashedPassword");
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  it("should throw an error for unexpected failures", async () => {
    mockUserRepo.getCredentialsPort.mockRejectedValue(new Error("Database error"));

    const loginData = { email: "test@example.com", password: "correctpassword" };

    await expect(loginUserUseCase(mockUserRepo, loginData, mockEntityManager))
      .rejects.toThrow("Database error");

    expect(mockUserRepo.getCredentialsPort).toHaveBeenCalledWith(mockEntityManager, loginData.email);
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(jwt.sign).not.toHaveBeenCalled();
  });
});
