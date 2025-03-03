import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import httpStatus from 'http-status';
import mongodbConnect from './config/db/mongodbConnect';

dotenv.config();

const app: Express = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongodbConnect();

// API Routes
app.use('/api/v1', routes);

app.get('/', (_req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ message: 'Home Route' });
});

console.log('port', process.env.PORT);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server up and running onrunning on http://localhost:${PORT}`),
);

export default app;
