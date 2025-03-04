import request from "supertest";
import AppDataSource from "../../../src/infrastructure/typeorm/config/data_source";
import t_user from "../../../src/infrastructure/typeorm/entity/user_entity";
import express from "express";
import router from "../../../src/interface/routes/users.routes";
import { userInfoType } from "../../../src/domain/model/users_model";
import { constants } from "../../../src/infrastructure/utility/constants";

const app = express();
app.use(express.json()); // Ensure JSON body parsing
app.use(router);

describe("POST /register", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  });

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.getRepository(t_user).delete({});
      await AppDataSource.destroy();
    }
  });

  it("should register a new user successfully", async () => {
    const newUser = {
      name: "Test User",
      email: "testuser@gmail.com",
      password: "SecurePass123",
      role: "user",
      age: 25,
    };

    const response = await request(app).post("/register").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "User added successfully.");

    const savedUser = await AppDataSource.getRepository(t_user).findOne({
      where: { email: newUser.email },
    });
    expect(savedUser).toBeDefined();
    expect(savedUser?.name).toBe(newUser.name);
    expect(savedUser?.role).toBe(newUser.role);
  });

  it("should not allow duplicate registration", async () => {
    const existingUser: userInfoType = {
      name: "Test User",
      email: "testuser@gmail.com",
      password: "SecurePass123",
      role: "user",
      age: 25,
    };

    // await AppDataSource.getRepository(t_user).save(existingUser);

    const response = await request(app).post("/register").send(existingUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty(
      "message",
      constants.ERROR_MESSAGE.USER_ALREADY_EXISTS
    );
  });

  //   it("should return 500 for an unexpected internal server error", async () => {
  //     jest
  //       .spyOn(AppDataSource.getRepository(t_user), "save")
  //       .mockImplementation(() => {
  //         throw new Error("Database error");
  //       });

  //     const userData = {
  //       name: "Error User",
  //       email: "erroruser@gmail.com",
  //       password: "pas12345",
  //       role: "user",
  //       age: 30,
  //     };

  //     const response = await request(app).post("/register").send(userData);

  //     expect(response.status).toBe(500);
  //     expect(response.body).toHaveProperty("message", "Internal server error");
  //   });
});
