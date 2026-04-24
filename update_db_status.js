import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'server', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.jobs = db.jobs.map(job => ({
  ...job,
  status: job.status || 'Open'
}));

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Updated db.json with status field.');
