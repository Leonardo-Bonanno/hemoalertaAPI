const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const alerts = require('../data/alerts.mock');
const filePath = path.join(__dirname, '..', 'data', 'alerts.json'); // Puxa as informações do JSON, essa parte vai ficar dentro do get no futuro, está aqui para evitar código duplicado

// GET LOCALS
router.get('/locals', (req, res) => {
  const localsPath = path.join(__dirname, '..', 'data', 'hemocentro.json');
  
  fs.readFile(localsPath, 'utf8', (err, data) => {

    if (err) {
      return res.status(500).json({ message: 'Erro ao ler locais' });
    }

    const locals = JSON.parse(data);
    res.status(200).json(locals);
  });
});

// GET ALERTS
router.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao ler alertas' });
    }

    const alerts = JSON.parse(data);
    res.status(200).json(alerts);
  });
});

// POST ALERTA
router.post('/', (req, res) => {
  const { hemocentro, sanguineo } = req.body;

  // 1️⃣ Validação
  if (!hemocentro || !sanguineo) {
    return res.status(400).json({
      message: 'Hemocentro e tipo sanguíneo são obrigatórios'
    });
  }

  // 2️⃣ Ler o JSON
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao ler alertas' });
    }

    const alerts = JSON.parse(data);

    // 3️⃣ Criar alerta
    const newAlert = {
      id: alerts.length + 1,
      data: new Date().toISOString(),
      hemocentro,
      sanguineo
    };

    // 4️⃣ Adicionar ao array
    alerts.push(newAlert);

    // 5️⃣ Salvar no arquivo
    fs.writeFile(filePath, JSON.stringify(alerts, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao salvar alerta' });
      }

      console.log('📨 Novo alerta criado:', newAlert);

      // 6️⃣ Resposta
      res.status(201).json({
        message: 'Alerta criado com sucesso',
        data: newAlert
      });
    });
  });
});

module.exports = router;