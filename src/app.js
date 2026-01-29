const express = require('express');
const cors = require('cors');

const alertsRoutes = require('./routes/alerts.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/alerts', alertsRoutes);

module.exports = app;