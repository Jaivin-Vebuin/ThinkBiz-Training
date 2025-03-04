import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import dbConnection from '../../config/dbConnection';
import userRoutes from '../../../Interface/routes/users.routes'

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export default function () {
  const app = express()

  let port: number = parseInt(process.env.port || '2000', 10);
  let host: string = (process.env.DB_HOST || 'localhost').toString();

  // general middlewares
  app.use(express.json());
  app.use(morgan('dev'));

  // use the routes
  app.use('/users',userRoutes);

  const startServer = async (): Promise<void> => {
    try {
      await dbConnection.getConnection();
      console.log('Connected to the database.');

      app.listen(port, () => {
        console.log(`Server is running on port http://${host}:${port}`);
      });
    } catch (error) {
      console.error('Failed to connect to the database.', error);
      process.exit(1);
    }
  };
  startServer();
}