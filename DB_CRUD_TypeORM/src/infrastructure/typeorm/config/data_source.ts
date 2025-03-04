import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const DB_PORT = parseInt(process.env.DB_PORT || '2000');

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/infrastructure/typeorm/entity/*.ts"],
  migrationsTableName: "entity_refactoring",
  logging: true,
  logger: "file",
  synchronize: true,
});

export default AppDataSource;
