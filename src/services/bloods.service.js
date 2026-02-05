const bloodsRepository = require("../repositories/bloods.repository");

async function getAllBloods() {
  return await bloodsRepository.getBloods();
}

async function getBloodById(id) {
  return await bloodsRepository.getBloodById(id);
}

async function mapBloods() {
  const bloods = await getAllBloods();

  return new Map(
    bloods.map(blood => [blood.id, blood.name])
  );
}

module.exports = {
  getAllBloods,
  getBloodById,
  mapBloods
};