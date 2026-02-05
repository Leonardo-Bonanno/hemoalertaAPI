const localsRepository = require("../repositories/locals.repository");

async function getAllLocals() {
  return await localsRepository.getLocals();
}

async function getLocalById(id) {
  return await localsRepository.getLocalById(id);
}

async function maplocals() {
  const locals = await getAllLocals();

  return new Map(
    locals.map(local => [local.id, local.name])
  );
}

module.exports = {
  getAllLocals,
  getLocalById,
  maplocals
};