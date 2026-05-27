import localsRepository from "../repositories/locals.repository.js";

async function getAllLocals() {
  return await localsRepository.getLocals();
}

async function getLocalById(id) {
  const local = await localsRepository.getLocalById(id);

  if (!local) {
    return null;
  }

  return {
    ...local,
    latitude: Number(local.latitude),
    longitude: Number(local.longitude)
  };
}

async function maplocals() {
  const locals = await getAllLocals();

  return new Map(
    locals.map(local => [local.id, local.nome])
  );
}

export default {
  getAllLocals,
  getLocalById,
  maplocals
};