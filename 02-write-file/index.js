const path = require('node:path');
const fs = require('node:fs');

const MESSAGE_EXIT = 'See you soon!!!';
const MESSAGE_WELCOME = 'Please, write something!';

const dir = path.dirname(__filename);
const filename = 'text.txt';
const stdin = process.stdin;
const stdout = process.stdout;
const ws = fs.createWriteStream(path.join(dir, filename));

stdout.write(MESSAGE_WELCOME + '\n');

process.on('SIGINT', () => {
  stdout.write(MESSAGE_EXIT);
  process.exit();
});

stdin.on('data', (chunk) => {
  const text = chunk.toString();
  if (text.trim() === 'exit') {
    stdout.write(MESSAGE_EXIT);
    process.exit();
  }
  ws.write(text);
});
