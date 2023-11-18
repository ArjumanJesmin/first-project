import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';

//parsers
app.use(express.json());
app.use(cors());

// application
app.use('/api/v1/students', StudentRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

export default app;
