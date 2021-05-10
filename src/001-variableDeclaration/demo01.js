const recast = require('recast');
const { printByConsole } = require('../utils');

// Let's turn this function declaration into a variable declaration.
const code = [
  'var a = 1;',
].join('\n');

// Parse the code using an interface similar to require("esprima").parse.
const ast = recast.parse(code);

// var a = 1;
printByConsole(recast.print(ast).code, { tag: '修改之前' });

// Grab a reference to the function declaration we just parsed.
const target = ast.program.body[0];

// Make sure it's a FunctionDeclaration (optional).
const n = recast.types.namedTypes;
n.VariableDeclaration.assert(target);

// 将 var 修改为 const
target.kind = 'const';

// const a = 1;
printByConsole(recast.print(ast).code, { tag: '修改之后' });
