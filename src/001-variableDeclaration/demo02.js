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

const b = recast.types.builders;

// 将值 1 修改为 2
target.declarations[0].init = b.literal(2);
// target.declarations = [b.variableDeclarator(b.identifier('b'), b.literal(2))];

// var a = 2;
printByConsole(recast.print(ast).code, { tag: '修改之后' });
