const fs = require("fs/promises");
const path = require("path");

const localsService = require("./locals.service");
const bloodsService = require("./bloods.service");

const alertsPath = path.join(__dirname, "..", "data", "alerts.json");

// Função para puxar todos os alertas, serve para todo tipo de manipulação
async function getAlerts() {
  const alerts =await fs.readFile(alertsPath, "utf8");
  return JSON.parse(alerts);
}

// Função para mapear os alertas, monta objeto para passar para o front
async function getFormattedAlerts() {
  const alerts = await getAlerts();

  return Promise.all(
    alerts.map(async (alert) => {
      const local = await localsService.getLocalById(alert.hemocentro);
      const blood = await bloodsService.getBloodById(alert.sanguineo);

      return {
        id: alert.id,
        data: alert.data,
        hemocentro: local ? local.name : "Desconhecido",
        sanguineo: blood ? blood.name : "Não identificado",
      };
    })
  );
}

async function createAlert({ hemocentro, sanguineo }) {
  // Validação
  if (!hemocentro || !sanguineo) {
    throw new Error("Hemocentro e tipo sanguíneo são obrigatórios");;
  }

  const alerts = await getAlerts();

  const newAlert = {
    id: alerts.length + 1,
    data: new Date().toISOString(),
    hemocentro,
    sanguineo,
  };

  alerts.push(newAlert);

  await fs.writeFile(alertsPath, JSON.stringify(alerts, null, 2));

  return newAlert;
}

module.exports = {
  getAlerts,
  getFormattedAlerts,
  createAlert
};