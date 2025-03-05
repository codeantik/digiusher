import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import httpStatus from 'http-status';
import morgan from 'morgan';
import mongodbConnect from './config/db/mongodbConnect';

dotenv.config();

const app: Express = express();

// Use Morgan in 'dev' mode
app.use(morgan('dev'));

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Server up and running onrunning on http://localhost:${PORT}`),
);

export default app;
