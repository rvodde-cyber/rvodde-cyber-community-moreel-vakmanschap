import QRCode from 'qrcode';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const urlArg = process.argv[2];
const deployPath = join(__dirname, '../docs/DEPLOY.md');

let url = urlArg?.trim();
if (!url) {
  const md = readFileSync(deployPath, 'utf8');
  const m = md.match(/\*\*Studentlink:\*\*\s*`(https:\/\/[^`]+)`/);
  url = m?.[1];
}

if (!url || url.includes('<site>')) {
  console.error('Geef student-URL: npm run qr -- https://recept-xxxx.netlify.app/');
  process.exit(1);
}

const out = join(__dirname, '../docs/qr-student.png');
await QRCode.toFile(out, url, { type: 'png', width: 512, margin: 2 });
console.log('QR opgeslagen:', out);
