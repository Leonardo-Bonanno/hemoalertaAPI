import express from 'express';
import cors from 'cors';
import alertsRoutes from './routes/alertsRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

export default app;