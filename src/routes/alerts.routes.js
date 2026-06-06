import { Router } from 'express';

const router = Router();

import alertsService from '../services/alerts.service.js';
import localsService from '../services/locals.service.js';
import bloodsService from '../services/bloods.service.js';
import geoService from '../services/geo.service.js';
//import whatsappService from '../services/whatsapp/sendMessage.js';

// GET LOCALS
router.get('/locals', async (req, res) => {
  try {
    const locals = await localsService.getAllLocals();
    res.status(200).json(locals);

  } catch (error) {
    return res.status(500).json({ message: 'Erro ao ler locais' });
  }
  
});

// GET BLOOD
router.get('/bloods', async (req, res) => {
  try {
    const bloods = await bloodsService.getAllBloods();
    res.status(200).json(bloods);

  } catch (error) {
    return res.status(500).json({ message: 'Erro ao ler tipos sanguineos' });
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
    const hemocentro = await localsService.getLocalById(newAlert.hemocentro.id);

    const alertReceivers = await geoService.findNearbyUsers(
      hemocentro.latitude,
      hemocentro.longitude,
      5
    );  
    
    alertsService.sendAlert(alertReceivers, hemocentro.nome, newAlert.bloodType.blood_type, hemocentro.endereco, hemocentro.horario_funcionamento);
    

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

export default router;