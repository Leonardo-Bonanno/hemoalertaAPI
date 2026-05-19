import prisma from "../config/prisma.js";

async function getBloods() { 
  return prisma.bloodType.findMany({ }); }

async function getBloodById(id) {
  return prisma.bloodType.findUnique({
    where: {
      id: Number(id)
    }
  });
}

export default {
  getBloods,
  getBloodById
}