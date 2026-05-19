import prisma from "../config/prisma.js";

// Busca todos os alertas
async function getAlerts() {
  return await prisma.alert.findMany({
    include: {
      bloodType: true,
      hemocentro: true,
    },

    orderBy: {
      created_at: "desc",
    },
  });
}

// Cria um novo alerta
async function create(alert) {
  const newAlert = await prisma.alert.create({
    data: {
      blood_type_id: Number(alert.sanguineo),
      hemocentro_id: Number(alert.hemocentro),

      // opcional
      status: alert.status || "ativo",
    },

    include: {
      bloodType: true,
      hemocentro: true,
    },
  });

  return newAlert;
}

export default {
  getAlerts,
  create,
};