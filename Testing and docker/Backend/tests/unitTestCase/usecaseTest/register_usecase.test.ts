import { registerUserUsecase } from "../../../src/application/use_cases/register_usecase";
import { userPort } from "../../../src/application/port/users_port";
import { EntityManager } from "typeorm";
import { constants } from "../../../src/infrastructure/utility/constants";
import bcrypt from "bcrypt";
import { userInfoType } from "../../../src/domain/model/users_model";

jest.mock("bcrypt");

describe("registerUserUsecase", () => {
  let mockUserRepo: jest.Mocked<userPort>;
  let mockEntityManager: jest.Mocked<EntityManager>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUserRepo = {
      getCredentialsPort: jest.fn(),
      registerUserPort: jest.fn(),
      getUserPort:jest.fn(),
      transactionWrapper: jest.fn((callback) => callback(mockEntityManager)),
    } as unknown as jest.Mocked<userPort>;

    mockEntityManager = {} as jest.Mocked<EntityManager>;
  });

  it("should successfully register a new user", async () => {
    const userData: userInfoType = { 
      name: "New User",
      email: "newuser@example.com",
      password: "password123",
      role: "user",
      age: 25
    };

    mockUserRepo.getCredentialsPort.mockResolvedValue([]);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
    mockUserRepo.registerUserPort.mockResolvedValue();

    const result = await registerUserUsecase(mockUserRepo, userData, mockEntityManager);

    expect(result).toEqual({ message: constants.SUCCESS_MESSAGE.USER_ADDED });
    expect(mockUserRepo.getCredentialsPort).toHaveBeenCalledWith(mockEntityManager, userData.email);
    expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
    expect(mockUserRepo.registerUserPort).toHaveBeenCalledWith(mockEntityManager, {
      name: userData.name,
      email: userData.email,
      password: "hashedPassword",
      role: userData.role,
      age: userData.age,
    });
  });

  it("should throw an error if email already exists", async () => {
    const userData: userInfoType = { 
      name: "Existing User",
      email: "existing@example.com",
      password: "password123",
      role: "user",
      age: 30
    };

    mockUserRepo.getCredentialsPort.mockResolvedValue([{ id: 1, password: "hashedPassword", role: "user" }]); 

    await expect(registerUserUsecase(mockUserRepo, userData, mockEntityManager))
      .rejects.toThrow(constants.ERROR_MESSAGE.USER_ALREADY_EXISTS);

    expect(mockUserRepo.getCredentialsPort).toHaveBeenCalledWith(mockEntityManager, userData.email);
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(mockUserRepo.registerUserPort).not.toHaveBeenCalled();
  });

  it("should throw an error for unexpected failures", async () => {
    const userData: userInfoType = { 
      name: "Error User",
      email: "error@example.com",
      password: "password123",
      role: "user",
      age: 28
    };

    mockUserRepo.getCredentialsPort.mockRejectedValue(new Error("Database error"));

    await expect(registerUserUsecase(mockUserRepo, userData, mockEntityManager))
      .rejects.toThrow("Database error");

    expect(mockUserRepo.getCredentialsPort).toHaveBeenCalledWith(mockEntityManager, userData.email);
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(mockUserRepo.registerUserPort).not.toHaveBeenCalled();
  });
});
