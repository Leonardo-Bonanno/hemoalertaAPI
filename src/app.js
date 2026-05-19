import express, { json } from 'express';
import cors from 'cors';

import alertsRoutes from './routes/alerts.routes.js';

const app = express();

app.use(cors());
app.use(json());

app.use('/alerts', alertsRoutes);

export default app;