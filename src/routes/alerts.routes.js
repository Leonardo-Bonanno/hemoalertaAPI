export default router;
const express = require('express');

const router = express.Router();

const alertsService = require('../services/alerts.service');
const localsService = require('../services/locals.service');

// GET LOCALS
router.get('/locals', async (req, res) => {
  try {
    const locals = await localsService.getAllLocals();
    res.status(200).json(locals);

  } catch (error) {
    return res.status(500).json({ message: 'Erro ao ler locais' });
  }
  
});

// GET ALERTS
router.get('/', async (req, res) => {
  try {

    const alerts = await alertsService.formatAlerts();
    res.status(200).json(alerts);

  } catch (error) {

    res.status(500).json({ message: 'Erro ao buscar alertas' });
    
  }
});

// POST ALERTA
router.post('/', async (req, res) => {
  try {
    const newAlert = await alertsService.createAlert(req.body);

    res.status(201).json({
      message: 'Alerta criado com sucesso',
      data: newAlert,
      type: "success"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      type: "danger"
    });
  }
});

module.exports = router;