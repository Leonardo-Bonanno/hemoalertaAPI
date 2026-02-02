const fs = require('fs/promises');
const path = require('path');

const bloodsPath = path.join(__dirname, '..', 'data', 'blood.json');

async function getAllBloods() {
    const data = await fs.readFile(bloodsPath, 'utf8')
    return JSON.parse(data);
}

async function getBloodById(id) {
  const bloods = await getAllBloods();
  return bloods.find(blood => blood.id === Number(id));
}

module.exports = {
  getAllBloods,
  getBloodById
};