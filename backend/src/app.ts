import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'autocarwellness-backend', message: 'API is running' });
});

app.use(errorHandler);

export default app;
