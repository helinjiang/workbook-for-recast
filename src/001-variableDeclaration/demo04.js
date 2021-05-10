const recast = require('recast');
const { printByConsole } = require('../utils');

// Let's turn this function declaration into a variable declaration.
const code = [
  'var a = { name: "helinjiang" };',
].join('\n');

// Parse the code using an interface similar to require("esprima").parse.
const ast = recast.parse(code);

// var a = { name: "helinjiang" };
printByConsole(recast.print(ast).code, { tag: '修改之前' });

// Grab a reference to the function declaration we just parsed.
const target = ast.program.body[0];

// Make sure it's a FunctionDeclaration (optional).
const n = recast.types.namedTypes;
n.VariableDeclaration.assert(target);

const b = recast.types.builders;

// 修改原有的属性值
target.declarations[0].init.properties[0].value = b.literal('recast');

// 增加一个新的属性值
target.declarations[0].init.properties[1] = b.objectProperty(b.identifier('age'), b.literal(99));

// var a = {
//   name: "recast",
//   age: 99
// };
printByConsole(recast.print(ast).code, { tag: '修改之后' });
