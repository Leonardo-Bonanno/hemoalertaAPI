const express = require('express');
const router = express.Router();

const alerts = require('../data/alerts.mock');

// GET
router.get('/', (req, res) => {
  res.status(200).json(alerts);
});

// POST
router.post('/', (req, res) => {
  const { hemocentro, tipoSanguineo } = req.body;

  // Validação
  if (!hemocentro || !tipoSanguineo) {
    return res.status(400).json({
      message: 'Hemocentro e tipo sanguíneo são obrigatórios'
    });
  }

  // Criação do novo alerta
  const newAlert = {
    id: alerts.length + 1,
    data: new Date().toISOString(),
    hemocentro,
    tipoSanguineo
  };

  // adiciona no "histórico"
  alerts.push(newAlert);

  console.log('📨 Novo alerta criado:');
  console.log(newAlert);

  res.status(201).json({
    message: 'Alerta criado com sucesso (simulação)',
    data: newAlert
  });
});

module.exports = router;