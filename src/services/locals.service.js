const fs = require('fs/promises');
const path = require('path');

const localsPath = path.join(__dirname, '..', 'data', 'hemocentro.json');

async function getAllLocals() {
    const data = await fs.readFile(localsPath, 'utf8')
    return JSON.parse(data);
}

async function getLocalById(id) {
  const locals = await getAllLocals();
  return locals.find(local => local.id === Number(id));
}

module.exports = {
  getAllLocals,
  getLocalById
};