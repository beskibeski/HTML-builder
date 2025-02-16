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

fs.mkdir(destCompile, () => {
  fs.writeFile(destFileCompile, '', () => {
    fs.readdir(destStyles, (err, files) => {
      for (let file of files) {
        if (path.extname(file).slice(1) === 'css') {
          const filePath = path.join(destStyles, file);
          let data = '';
          const rsFile = rs(filePath);
          rsFile.on('data', (chunk) => {
            data += chunk.toString();
          });
          rsFile.on('end', () => {
            fs.appendFile(destFileCompile, data + '\n', () => {});
          });
        }
      }
    });
  });
});
