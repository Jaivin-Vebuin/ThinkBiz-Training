import { getUserUseCase } from "../../../src/application/use_cases/get_usecase";
import { userPort } from "../../../src/application/port/users_port";
import { EntityManager } from "typeorm";
import { constants } from "../../../src/infrastructure/utility/constants";
import { userInfoType } from "../../../src/domain/model/users_model";

jest.mock("typeorm");

describe("getUserUseCase", () => {
  let mockUserRepo: jest.Mocked<userPort>;
  let mockEntityManager: jest.Mocked<EntityManager>;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUserRepo = {
      getUserPort: jest.fn(),
      transactionWrapper: jest.fn((callback) => callback(mockEntityManager)),
    } as unknown as jest.Mocked<userPort>;

    mockEntityManager = {} as jest.Mocked<EntityManager>;
  });

  it("should return user data when user is found", async () => {
    const mockUser = { id: 1, email: "test@example.com", role: "user", age:20 } as unknown as userInfoType[];
    mockUserRepo.getUserPort.mockResolvedValue(mockUser);
    
    const userData = {id:1, role:"user"};
    
    const result = await getUserUseCase(mockUserRepo, userData, mockEntityManager);
    
    expect(result).toEqual(mockUser);
    expect(mockUserRepo.getUserPort).toHaveBeenCalledWith(mockEntityManager, userData.id);
  });

  it("should throw an error when user is not found", async () => {
    mockUserRepo.getUserPort.mockRejectedValue(new Error(constants.ERROR_MESSAGE.USER_NOT_FOUND));
    
    const userData = {id:1, role:"user"};
    
    await expect(getUserUseCase(mockUserRepo, userData, mockEntityManager))
      .rejects.toThrow(constants.ERROR_MESSAGE.USER_NOT_FOUND);
    
    expect(mockUserRepo.getUserPort).toHaveBeenCalledWith(mockEntityManager, userData.id);
  });

  it("should throw an error for unexpected failures", async () => {
    mockUserRepo.getUserPort.mockRejectedValue(new Error("Database error"));
    
    const userData = {id:1, role:"user"};
    
    await expect(getUserUseCase(mockUserRepo, userData, mockEntityManager))
      .rejects.toThrow("Database error");
    
    expect(mockUserRepo.getUserPort).toHaveBeenCalledWith(mockEntityManager, userData.id);
  });
});
