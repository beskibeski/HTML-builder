const path = require('node:path');
const fs = require('node:fs');

const dir = path.dirname(__filename);
const dirStyles = 'styles';
const dirBundle = 'project-dist';
const destCompile = path.join(dir, dirBundle);
const destStyles = path.join(dir, dirStyles);
const fileToCompile = 'bundle.css';
const destFileCompile = path.join(destCompile, fileToCompile);
const rs = fs.createReadStream;
const ws = fs.createWriteStream(destFileCompile);

fs.readdir(destStyles, (err, files) => {
  for (let file of files) {
    const filePath = path.join(destStyles, file);
    rs(filePath).on('data', (chunk) => {
      ws.write(chunk.toString());
    });
  }
});
