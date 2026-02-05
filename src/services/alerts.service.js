const alertsRepository = require("../repositories/alerts.repository");

const localsService = require("./locals.service");
const bloodsService = require("./bloods.service");

// Função para mapear os alertas, monta objeto para passar para o front
async function formatAlerts() {
  const alerts = await alertsRepository.getAlerts();
  const locals = await localsService.getAllLocals();
  const bloods = await bloodsService.getAllBloods();

  const localsMap = new Map(
    locals.map(local => [local.id, local.name])
  );
  const bloodsMap = new Map(
    bloods.map(blood => [blood.id, blood.name])
  );

  return alerts.map(alert => ({
    id: alert.id,
    data: alert.data,
    hemocentro: localsMap.get(alert.hemocentro) || "Desconhecido",
    sanguineo: bloodsMap.get(alert.sanguineo) || "Não identificado",
  }));
}


async function createAlert({ hemocentro, sanguineo }) {

  if (!hemocentro || !sanguineo) {
    throw new Error("Hemocentro e/ou tipo sanguíneo não definidos");;
  }

  const newAlert = {
    data: new Date().toISOString(),
    hemocentro: Number(hemocentro),
    sanguineo: Number(sanguineo),
  };

  return alertsRepository.create(newAlert);

}

module.exports = {
  formatAlerts,
  createAlert
};