import bloodsRepository from "../repositories/bloods.repository.js";

async function getAllBloods() {
  return await bloodsRepository.getBloods();
}

async function getBloodById(id) {
  return await bloodsRepository.getBloodById(id);
}

async function mapBloods() {
  const bloods = await getAllBloods();

  return new Map(
    bloods.map(blood => [blood.id, blood.blood_type])
  );
}

export default {
  getAllBloods,
  getBloodById,
  mapBloods
};