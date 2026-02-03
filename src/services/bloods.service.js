const bloodsRepository = require("../repositories/bloods.repository");

async function getAllBloods() {
  return await bloodsRepository.getBloods();
}

async function getBloodById(id) {
  return await bloodsRepository.getBloodById(id);
}

module.exports = {
  getAllBloods,
  getBloodById,
};