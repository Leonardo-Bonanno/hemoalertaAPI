import alertsRepository from "../repositories/alerts.repository.js";
import localsService from "./locals.service.js";
import bloodsService from "./bloods.service.js";
import whatsappService from "./whatsapp/sendMessage.js";

async function formatAlerts() {
  const alerts = await alertsRepository.getAlerts();
  const locals = await localsService.maplocals();
  const bloods = await bloodsService.mapBloods();

  return alerts.map(alert => ({
    id: alert.id,
    data: alert.created_at,
    hemocentro: locals.get(alert.hemocentro.id) || "Desconhecido",
    sanguineo: bloods.get(alert.bloodType.id) || "Não identificado",
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

async function sendAlert(alertReceivers, hemocentro, bloodType, endereco, horario) {

  for (const receiver of alertReceivers) {
    await whatsappService.sendWhatsAppMessage(
      receiver.number,
      hemocentro,
      bloodType,
      endereco,
      horario
    );
  }
}

export default {
  formatAlerts,
  createAlert,
  sendAlert
};