import request from "supertest";
import express from 'express';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AppDataSource from "../../../src/infrastructure/typeorm/config/data_source";
import t_user from "../../../src/infrastructure/typeorm/entity/user_entity";
import router from "../../../src/interface/routes/users.routes";
import { constants } from "../../../src/infrastructure/utility/constants";
// import app from "../../../src/infrastructure/webserver/express/server";

const app = express();
app.use(express.json()); // Ensure JSON body parsing
app.use(router);

describe("POST /login", () => {
  const JWT_SECRET = process.env.JWT_SECRET || "test_secret";
  type userRole = "admin" | "user";
  type userEntry = {
    name:string;
    email:string;
    password:string;
    role:userRole;
    age:number;
  }
//   let testUsers: user[];

  beforeEach(async () => {
    // Initialize DB connection
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
        email: "user2@gmail.com",
        role: "user",
        age: 27,
        password: await hashPassword("testpassword2"),
      },
      {
        name: "Admin1",
        email: "admin1@gmail.com",
        role: "admin",
        age: 30,
        password: await hashPassword("adminpassword"),
      },
    ];

    // Insert test users into the database
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(t_user)
      .values(array)
      .execute();

    // Fetch inserted users for ID reference
    const testUsers = await AppDataSource.getRepository(t_user).find();
  });

  afterEach(async () => {
    // Cleanup: Delete test data after running tests
    await AppDataSource.getRepository(t_user).delete({});
    await AppDataSource.destroy();
  });

  it("should authenticate a user and return a token", async () => {
    // const user = testUsers.find((user) => user.role === "user");

    const response = await request(app)
      .post("/login")
      .send({
        email: "user1@gmail.com",
        password: "testpassword1",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", constants.SUCCESS_MESSAGE.AUTHENTICATION_SUCCESSFUL);
    expect(response.body).toHaveProperty("token");
  });

  it("should return an error if authentication fails", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: "nonexistent@gmail.com",
        password: "wrongpassword",
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", constants.ERROR_MESSAGE.AUTHENTICATION_FAILED);
  });
});
