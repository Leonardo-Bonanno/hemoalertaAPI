const fs = require('fs');
const path = require('path');

const alertsPath = path.join(__dirname, '..', 'data', 'alerts.json');
const localsPath = path.join(__dirname, '..', 'data', 'hemocentro.json');
const bloodPath = path.join(__dirname, '..', 'data', 'blood.json');

function getFormattedAlerts() {
  const alerts = JSON.parse(fs.readFileSync(alertsPath, 'utf8'));
  const locals = JSON.parse(fs.readFileSync(localsPath, 'utf8'));
  const bloods = JSON.parse(fs.readFileSync(bloodPath, 'utf8'));

  return alerts.map(alert => {
    const local = locals.find(l => l.id === Number(alert.hemocentro));
    const blood = bloods.find(b => b.id === Number(alert.sanguineo));

    return {
      id: alert.id,
      data: alert.data,
      hemocentro: local ? local.name : 'Desconhecido',
      sanguineo: blood ? blood.name : 'Não identificado'
    };
  });
}

module.exports = {
  getFormattedAlerts
};
