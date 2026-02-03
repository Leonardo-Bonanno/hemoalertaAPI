const fs = require("fs/promises");
const path = require("path");

const alertsPath = path.join(__dirname, "..", "data", "alerts.json");

// Lê o arquivo inteiro
async function getAlerts() {
  const data = await fs.readFile(alertsPath, "utf8");
  return JSON.parse(data);
}

// Salva o array inteiro
async function saveAlerts(alerts) {
  await fs.writeFile(alertsPath, JSON.stringify(alerts, null, 2));
}

// Cria um novo alerta
async function create(alert) {
  const alerts = await getAlerts();

  // No futuro o id tem que se basear no último id
  const newAlert = {
    id: alerts.length + 1,
    data: alert.data,
    hemocentro: Number(alert.hemocentro),
    sanguineo: Number(alert.sanguineo),
  };

  alerts.push(newAlert);
  await saveAlerts(alerts);

  return newAlert;
}

module.exports = {
  getAlerts,
  create
};
