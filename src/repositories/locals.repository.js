const fs = require("fs/promises");
const path = require("path");

const localsPath = path.join(__dirname, "..", "data", "hemocentro.json");

async function getLocals() {
  const data = await fs.readFile(localsPath, "utf8");
  return JSON.parse(data);
}

async function getLocalById(id) {
  const locals = await getLocals();
  return locals.find(l => l.id === Number(id));
}

module.exports = {
  getLocals,
  getLocalById
};
