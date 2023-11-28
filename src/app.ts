import { notFound } from './middlewares/notFound';
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { globalErrorHandler } from './middlewares/globalErrorhandaler';
import router from './app/routes';

//parsers
app.use(express.json());
app.use(cors());

// application
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  const a = 10;
  res.send({a});
};

app.get('/', test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
