import prisma from "../config/prisma.js";

async function getLocals() { 
  return prisma.hemocentro.findMany({
    orderBy: {
      nome: "asc",
    }
   }); }

async function getLocalById(id) {
  return prisma.hemocentro.findUnique({
    where: {
      id: Number(id)
    }
  });
}

export default {
  getLocals,
  getLocalById
}