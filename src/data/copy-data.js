import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '../../dist/data');
const sourceDir = __dirname;

if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

fs.readdirSync(sourceDir).forEach((file) => {
    if (file.endsWith('.json')) {
        fs.copyFileSync(path.join(sourceDir, file), path.join(distDir, file));
    }
});

console.log('JSON Files Copied succesfully!');