const fs = require('node:fs');
const path = require('node:path');

const dir = path.dirname(__filename);
const folderToMake = 'project-dist';
const destFolderToMake = path.join(dir, folderToMake);
const dirStylesToGet = 'styles';
const destStylesToGet = path.join(dir, dirStylesToGet);
const dirComponentsToGet = 'components';
const destComponentsToGet = path.join(dir, dirComponentsToGet);
const fileStyles = 'styles.css';
const fileHtml = 'index.html';
const fileTemplate = 'template.html';
const destTemplateToGet = path.join(dir, fileTemplate);
const destFileStyles = path.join(destFolderToMake, fileStyles);
const folderAssets = 'assets';
const destFolderAssets = path.join(dir, folderAssets);
const destFolderToMakeAssets = path.join(destFolderToMake, folderAssets);
const destFileHtml = path.join(destFolderToMake, fileHtml);

const rs = fs.createReadStream;
const ws = fs.createWriteStream;

fs.mkdir(destFolderToMake, () => {});

fs.readdir(destStylesToGet, (err, files) => {
  for (let file of files) {
    const filePath = path.join(destStylesToGet, file);
    rs(filePath).on('data', (chunk) => {
      ws(destFileStyles).write(chunk.toString());
    });
  }
});

fs.cp(destFolderAssets, destFolderToMakeAssets, { recursive: true }, () => {});

fs.copyFile(destTemplateToGet, destFileHtml, () => {
  let data = '';
  rs(destFileHtml)
    .on('data', (chunkHtml) => {
      data = `${data}${chunkHtml.toString()}`;
    })
    .on('close', () => {
      fs.readdir(destComponentsToGet, (err, files) => {
        for (let file of files) {
          if (path.extname(file).slice(1) === 'html') {
            const filePath = path.join(destComponentsToGet, file);
            const fileBaseName = path.basename(filePath);
            const componentName = fileBaseName.slice(
              0,
              fileBaseName.lastIndexOf('.'),
            );
            rs(filePath)
              .on('data', (chunk) => {
                data = data.replaceAll(
                  `{{${componentName}}}`,
                  chunk.toString().trim(),
                );
              })
              .on('close', () => {
                ws(destFileHtml).write(data);
              });
          }
        }
      });
    });
});
