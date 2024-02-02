const fs = require('node:fs');
const path = require('node:path');

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