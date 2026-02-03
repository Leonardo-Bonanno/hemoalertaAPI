const localsRepository = require("../repositories/locals.repository");

async function getAllLocals() {
  return await localsRepository.getLocals();
}

async function getLocalById(id) {
  return await localsRepository.getLocalById(id);
}

module.exports = {
  getAllLocals,
  getLocalById,
};