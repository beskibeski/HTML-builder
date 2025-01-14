const path = require('node:path');
const fs = require('node:fs');

const dir = path.dirname(__filename);
const fileName = 'text.txt';

const rs = fs.createReadStream(path.join(dir, fileName));
const out = process.stdout;

rs.on('data', (chunk) => {
  out.write(chunk.toString());
});
