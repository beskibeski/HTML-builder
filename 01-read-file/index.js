const path = require('node:path');
const fs = require('node:fs');

const dir = path.dirname(__filename);
const fileName = 'text.txt';

const rs = new fs.ReadStream(path.join(dir, fileName));
const out = process.stdout;

let data = '';

rs.on('data', (chunk) => {
  data += chunk;
});

rs.on('end', () => {
  out.write(data.trim());
});
