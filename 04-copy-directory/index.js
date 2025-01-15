const fs = require('node:fs');
const path = require('node:path');

const dirToCopy = 'files';
const dirToMake = 'files-copy';
const dir = path.dirname(__filename);
const folderToCopy = path.join(dir, dirToCopy);
const folderToMake = path.join(dir, dirToMake);

fs.rm(folderToMake, { recursive: true }, () => {
  fs.readdir(folderToCopy, (err, files) => {
    for (let file of files) {
      const fileCopyPath = path.join(folderToCopy, file);
      const fileMakePath = path.join(folderToMake, file);
      fs.cp(fileCopyPath, fileMakePath, () => {});
    }
  });
});
