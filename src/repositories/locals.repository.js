import prisma from "../config/prisma.js";

export async function getLocals() { 
  return prisma.hemocentro.findMany({ }); }

export async function getLocalById(id) {
  return prisma.hemocentro.findUnique({
    where: {
      id: Number(id)
    }
  });
}