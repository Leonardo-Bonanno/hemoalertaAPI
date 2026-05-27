import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersPath = path.join(__dirname, '..', 'data', 'users.json');

async function getUsers() {
  const data = await fs.readFile(usersPath, 'utf8');
  return JSON.parse(data);
}

export default {
  getUsers
};