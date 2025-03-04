import { deleteUserUseCase } from "../../../src/application/use_cases/delete_usecase";
import { userPort } from "../../../src/application/port/users_port";
import { EntityManager } from "typeorm";
import { constants } from "../../../src/infrastructure/utility/constants";

jest.mock("typeorm");

describe("deleteUserUseCase", () => {
  let mockUserRepo: jest.Mocked<userPort>;
  let mockEntityManager: jest.Mocked<EntityManager>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockEntityManager = {} as jest.Mocked<EntityManager>;

    mockUserRepo = {
      deleteUserPort: jest.fn(),
      getUserPort: jest.fn(),
      transactionWrapper: jest.fn((callback) => callback(mockEntityManager)),
    } as unknown as jest.Mocked<userPort>;
  });

  it("should delete the user successfully", async () => {
    const userData = {id:1, role:"user"};

    mockUserRepo.getUserPort.mockResolvedValue([{ id: userData.id, email: "test@example.com" }]);
    mockUserRepo.deleteUserPort.mockResolvedValue();

    await expect(deleteUserUseCase(mockUserRepo, userData, mockEntityManager)).resolves.toBe(undefined);

    expect(mockUserRepo.getUserPort).toHaveBeenCalledWith(mockEntityManager, userData.id);
    expect(mockUserRepo.deleteUserPort).toHaveBeenCalledWith(mockEntityManager, userData.id);
  });

  it("should throw an error if the user does not exist", async () => {
    const userData = {id:1, role:"user"};

    mockUserRepo.getUserPort.mockResolvedValue([]);

    await expect(deleteUserUseCase(mockUserRepo, userData, mockEntityManager)).rejects.toThrow(
      constants.ERROR_MESSAGE.USER_NOT_FOUND
    );

    expect(mockUserRepo.getUserPort).toHaveBeenCalledWith(mockEntityManager, userData.id);
    expect(mockUserRepo.deleteUserPort).not.toHaveBeenCalled();
  });

  it("should throw an error for unexpected failures", async () => {
    const userData = {id:1, role:"user"};

    mockUserRepo.getUserPort.mockResolvedValue([{ id: userData.id, email: "test@example.com" }]);
    mockUserRepo.deleteUserPort.mockRejectedValue(new Error("Database error"));

    await expect(deleteUserUseCase(mockUserRepo, userData, mockEntityManager)).rejects.toThrow("Database error");

    expect(mockUserRepo.getUserPort).toHaveBeenCalledWith(mockEntityManager, userData.id);
    expect(mockUserRepo.deleteUserPort).toHaveBeenCalledWith(mockEntityManager, userData.id);
  });
});
