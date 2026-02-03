const fs = require("fs/promises");
const path = require("path");

const bloodPath = path.join(__dirname, "..", "data", "blood.json");

async function getBloods() {
  const data = await fs.readFile(bloodPath, "utf8");
  return JSON.parse(data);
}

async function getBloodById(id) {
  const bloods = await getBloods();
  return bloods.find(b => b.id === Number(id));
}

module.exports = {
  getBloods,
  getBloodById
};
