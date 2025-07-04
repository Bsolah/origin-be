import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config';
import { errorMiddleware } from './middlewares/errorMiddleware';
import establishDatabaseConnection from './database';

declare module 'express-serve-static-core' {
  interface Request {
    file: any;
    files: any;
    user: {
      id: string;
      email: string;
      employeeId?: string;
    };
  }
}

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());


app.use('*', (_: Request, res: Response, __: NextFunction) => {
  res.status(404).json({ message: 'Not Found' });
});
app.use(errorMiddleware);

establishDatabaseConnection()
  .then(() => {
    console.log('Database connected 🔥 🔥 🔥');
    app.listen(config().port, () => {
      console.log(
        `⚡️⚡️⚡️ Server is running on port ${config().port} ⚡️⚡️⚡️`,
      );
    });
  })
  .catch((err: Error) => {
    console.log(err);
  });
