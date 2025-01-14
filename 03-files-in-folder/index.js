const path = require('node:path');
const fs = require('node:fs');

const dirname = 'secret-folder';
const dir = path.dirname(__filename);
const folder = path.join(dir, dirname);
const stdout = process.stdout;

fs.readdir(folder, (err, files) => {
  for (let file of files) {
    fs.stat(path.join(folder, file), (err, fileStat) => {
      if (!fileStat.isDirectory()) {
        const filePath = path.join(folder, file);
        const fileBaseName = path.basename(filePath);
        const fileSize = fileStat.size / 1000;
        stdout.write(
          `${fileBaseName.slice(0, fileBaseName.lastIndexOf('.'))} - ${path
            .extname(filePath)
            .slice(1)} - ${fileSize}kb\n`,
        );
      }
    });
  }
});
