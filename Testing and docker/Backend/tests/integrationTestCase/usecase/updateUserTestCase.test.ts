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
    name:string;
    email:string;
    password:string;
    role:userRole;
    age:number;
  }

describe("PATCH /", () => {
  let token:string;
  let userId1:number|undefined;
  let userId2:number|undefined;

  beforeEach(async () => {
    await AppDataSource.initialize();

    const hashPassword = async (password:string) => {
      return await bcrypt.hash(password, 10);
    };

    const array:userEntry[] = [
      {
        name: "User1",
        email: "user1@gmail.com",
        role: "user",
        age: 25,
        password: await hashPassword("testpassword1"),
      },
      {
        name: "User2",
        email: "user2@gmail.com",
        role: "admin",
        age: 25,
        password: await hashPassword("testpassword2"),
      }
    ];

    await AppDataSource.createQueryBuilder().insert().into(t_user).values(array).execute();

    const user1 = await AppDataSource.getRepository(t_user).findOne({ where: { email: "user1@gmail.com" } });
    userId1 = user1?.id;

    const user2 = await AppDataSource.getRepository(t_user).findOne({ where: { email: "user2@gmail.com" } });
    userId2 = user2?.id;

    const response = await request(app).post("/login").send({
      email: "user1@gmail.com",
      password: "testpassword1",
    });

    token = response.body.token;
  });

  afterEach(async () => {
    await AppDataSource.getRepository(t_user).delete({});
    await AppDataSource.destroy();
  });

  it("should update the user and return a success message", async () => {

    const response = await request(app)
      .patch(`/?id=${userId1}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated User1",
        age: 26,
      });

    expect(response.status).toBe(constants.SUCCESS_STATUS.OK);
    expect(response.body).toHaveProperty("message", constants.SUCCESS_MESSAGE.USER_UPDATED);
  });

  it("should return an error if the user is not found", async () => {
    const response = await request(app)
      .patch(`/?id=${20}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated User1",
        age: 26,
      });

    expect(response.status).toBe(constants.ERROR_STATUS.NOT_FOUND);
    expect(response.body).toHaveProperty("message", constants.ERROR_MESSAGE.USER_NOT_FOUND);
  });

  it("should return an error if invalid access", async () => {

    console.log("inside 3rd it", userId2, typeof(userId2))

    const response = await request(app)
      .patch(`/?id=${userId2}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated User1",
        email: "updateduser1@gmail.com",
        age: 26,
      });

    expect(response.status).toBe(constants.ERROR_STATUS.BAD_REQUEST);
    expect(response.body).toHaveProperty("message", constants.ERROR_MESSAGE.INVALID_ACCESS);
  });
});
