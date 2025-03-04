import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AppDataSource from "../../../src/infrastructure/typeorm/config/data_source";
import t_user from "../../../src/infrastructure/typeorm/entity/user_entity";
import router from "../../../src/interface/routes/users.routes";
import { constants } from "../../../src/infrastructure/utility/constants";

const app = express();
app.use(express.json());
app.use(router);

type userRole = "admin" | "user";
type userEntry = {
  name: string;
  email: string;
  password: string;
  role: userRole;
  age: number;
};

describe("DELETE /", () => {
  let token: string;
  let adminToken: string;
  let userId1: number | undefined;
  let userId2: number | undefined;

  beforeEach(async () => {
    await AppDataSource.initialize();

    const hashPassword = async (password: string) => {
      return await bcrypt.hash(password, 10);
    };

    const array: userEntry[] = [
      {
        name: "User1",
        email: "user1@gmail.com",
        role: "user",
        age: 25,
        password: await hashPassword("testpassword1"),
      },
      {
        name: "User2",
        email: "admin@gmail.com",
        role: "admin",
        age: 30,
        password: await hashPassword("testpassword2"),
      },
    ];

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(t_user)
      .values(array)
      .execute();

    const user1 = await AppDataSource.getRepository(t_user).findOne({
      where: { email: "user1@gmail.com" },
    });
    userId1 = user1?.id;

    const user2 = await AppDataSource.getRepository(t_user).findOne({
      where: { email: "admin@gmail.com" },
    });
    userId2 = user2?.id;

    const responseUser = await request(app).post("/login").send({
      email: "user1@gmail.com",
      password: "testpassword1",
    });
    token = responseUser.body.token;

    const responseAdmin = await request(app).post("/login").send({
      email: "admin@gmail.com",
      password: "testpassword2",
    });
    adminToken = responseAdmin.body.token;
  });

  afterEach(async () => {
    await AppDataSource.getRepository(t_user).delete({});
    await AppDataSource.destroy();
  });

  it("should delete the user successfully", async () => {
    const response = await request(app)
      .delete(`/?id=${userId1}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(constants.SUCCESS_STATUS.OK);
    expect(response.body).toHaveProperty("message", constants.SUCCESS_MESSAGE.REQUEST_SUCCEEDED);
  });

  it("should return an error if the user is not found", async () => {
    const response = await request(app)
      .delete(`/?id=${9999}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(constants.ERROR_STATUS.NOT_FOUND);
    expect(response.body).toHaveProperty("message", constants.ERROR_MESSAGE.USER_NOT_FOUND);
  });

  it("should return an error if unauthorized user tries to delete another user", async () => {
    const response = await request(app)
      .delete(`/?id=${userId2}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(constants.ERROR_STATUS.BAD_REQUEST);
    expect(response.body).toHaveProperty("message", constants.ERROR_MESSAGE.INVALID_INPUT);
  });

  it("should allow admin to delete another user", async () => {
    const response = await request(app)
      .delete(`/?id=${userId1}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(constants.SUCCESS_STATUS.OK);
    expect(response.body).toHaveProperty("message", constants.SUCCESS_MESSAGE.REQUEST_SUCCEEDED);
  });
});
