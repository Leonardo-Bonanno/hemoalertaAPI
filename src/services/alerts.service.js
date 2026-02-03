const alertsRepository = require("../repositories/alerts.repository");

const localsService = require("./locals.service");
const bloodsService = require("./bloods.service");

// Função para mapear os alertas, monta objeto para passar para o front
async function formatAlerts() {
  const alerts = await alertsRepository.getAlerts();

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