const fs = require('fs');

function printByConsole(content, opts = {}) {
  console.log(`\n=========== ${opts.tag} begin ===========`);
  console.log(content);
  console.log(`=========== ${opts.tag} end ===========\n`);
}

function readFileSync(file) {
  return fs.readFileSync(file, { encoding: 'utf8' });
}

module.exports = {
  printByConsole,
  readFileSync,
};
