import prisma from "../config/prisma.js";

export async function getBloods() { 
  return prisma.bloodType.findMany({ }); }

export async function getBloodById(id) {
  return prisma.bloodType.findUnique({
    where: {
      id: Number(id)
    }
  });
}