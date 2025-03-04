// import request from "supertest";
// import jwt from "jsonwebtoken";
// import app from "../../../src/infrastructure/webserver/express/server";
// import { UserRepository } from "../../../src/infrastructure/repositories/user_repository/user_repo";
// import { constants } from "../../../src/infrastructure/utility/constants";

// jest.mock("../../../src/infrastructure/repositories/user_repository/user_repo");

// describe("GET /users", () => {
//     const JWT_SECRET = process.env.JWT_SECRET || "test_secret";

//     beforeEach(() => {
//       jest.clearAllMocks();
//     });

//     const generateToken = (user: { id: number; role: "admin" | "user" }) => {
//       return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
//     };

//     it("should return all users when isAll is true", async () => {
//       const token = generateToken({ id: 1, role: "admin" });

//       (UserRepository.getUserPort as jest.Mock).mockResolvedValue({
//         message: [
//           { id: 1, name: "Hetvi", email: "Hetvi@gmail.com", role: "user", age: 22 },
//         ],
//       });

//       const response = await request(app)
//         .get("/users/?isAll=1")
//         .set("Authorization", `Bearer ${token}`);

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty("message");
//       expect(response.body.message).toEqual([
//         { id: 1, name: "Hetvi", email: "Hetvi@gmail.com", role: "user", age: 22 },
//       ]);
//       expect(UserRepository.getUserPort).toHaveBeenCalledWith(expect.any(Object));
//     });

//     it("should return a single user when isAll is false", async () => {
//       const token = generateToken({ id: 1, role: "admin" });

//       (UserRepository.getUserPort as jest.Mock).mockResolvedValue({
//         message: [
//           { id: 1, name: "Hetvi", email: "Hetvi@gmail.com", role: "admin", age: 22 },
//         ],
//       });

//       const response = await request(app)
//         .get("/users/?isAll=0")
//         .set("Authorization", `Bearer ${token}`);

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty("message");
//       expect(response.body.message).toEqual([
//         { id: 1, name: "Hetvi", email: "Hetvi@gmail.com", role: "user", age: 22 },
//       ]);
//       expect(UserRepository.getUserPort).toHaveBeenCalledWith(expect.any(Object), 1);
//     });

//     it("should return user's data", async () => {
//         const token = generateToken({ id: 1, role: "user" });

//         (UserRepository.getUserPort as jest.Mock).mockResolvedValue({
//           message: [
//             { id: 1, name: "Hetvi", email: "Hetvi@gmail.com", role: "user", age: 22 },
//           ],
//         });

//         const response = await request(app)
//           .get("/users")
//           .set("Authorization", `Bearer ${token}`);

//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty("message");
//         expect(response.body.message).toEqual([
//           { id: 1, name: "Hetvi", email: "Hetvi@gmail.com", role: "user", age: 22 },
//         ]);
//         expect(UserRepository.getUserPort).toHaveBeenCalledWith(expect.any(Object), 1);
//       });

//   });

import request from "supertest";
import jwt from "jsonwebtoken";
import AppDataSource from "../../../src/infrastructure/typeorm/config/data_source";
import t_user from "../../../src/infrastructure/typeorm/entity/user_entity";
import app from "../../../src/infrastructure/webserver/express/server";

describe("GET /users", () => {
  const JWT_SECRET = process.env.JWT_SECRET || "test_secret";
  let testUsers: t_user[]; // Store inserted users

  beforeEach(async () => {
    // Initialize DB connection
    await AppDataSource.initialize();

    const array:t_user[] = [
      {
        id:0,
        name: "User1",
        email: "user1@gmail.com",
        role: "user",
        age: 25,
        password: "testpassword1",
      },
      {
        id:0,
        name: "User2",
        email: "user2@gmail.com",
        role: "user",
        age: 27,
        password: "testpassword2",
      },
      {
        id:0,
        name: "Admin1",
        email: "admin1@gmail.com",
        role: "admin",
        age: 30,
        password: "adminpassword",
      },
    ];

    // Insert test users and admin into the database
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(t_user)
      .values(array)
      .execute();

    // Fetch inserted users for ID reference
    testUsers = await AppDataSource.getRepository(t_user).find();
  });

  afterEach(async () => {
    // Cleanup: Delete test data after running tests
    await AppDataSource.getRepository(t_user).delete({});
    await AppDataSource.destroy();
  });

  const generateToken = (user: { id: number; role: "admin" | "user" }) => {
    return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
  };

  it("should return all users when isAll is true", async () => {
    const admin = testUsers.find((user) => user.role === "admin");
    const token = generateToken({ id: admin!.id, role: "admin" });

    const response = await request(app)
      .get("/users?isAll=1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message.length).toBe(3);
  });

  it("should return a single user's data", async () => {
    const user = testUsers.find((user) => user.role === "user");
    const token = generateToken({ id: user!.id, role: "user" });

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual([
      {
        id: user!.id,
        name: user!.name,
        email: user!.email,
        role: user!.role,
        age: user!.age,
      },
    ]);
  });
});
