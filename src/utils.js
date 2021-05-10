function printByConsole(content, opts = {}) {
  console.log(`\n=========== ${opts.tag} begin ===========`);
  console.log(content);
  console.log(`=========== ${opts.tag} end ===========\n`);
}

module.exports = {
  printByConsole,
};
