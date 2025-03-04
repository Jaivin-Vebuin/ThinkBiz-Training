import 'reflect-metadata';
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import data_source from "../../typeorm/config/data_source";
import userRoutes from "../../../interface/routes/users.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../../../swagger/swagger.json";
import cors from 'cors';

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

  const app = express();

  const port: number = parseInt(process.env.SERVER_PORT || "2000", 10);
  const host: string = process.env.DB_HOST || "localhost";

  // general middlewares
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cors())

  // use user the routes
  app.use("/users", userRoutes);

  // database connection
  data_source
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
      app.listen(port, () => {
        console.log(`Server is running on port http://${host}:${port}`);

        // swagger api route access on succesfull connection
        app.use(
          "/user-api-doc",
          swaggerUi.serve,
          swaggerUi.setup(swaggerDocument)
        );
      });
    })
    .catch((error) => {
      console.log("Error initializing database connection:", error);
    });

    export default app;