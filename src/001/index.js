const recast = require('recast');
const { printByConsole } = require('../utils');

// Let's turn this function declaration into a variable declaration.
const code = [
  'function add(a, b) {',
  '  return a +',
  '    // Weird formatting, huh?',
  '    b;',
  '}',
].join('\n');

// Parse the code using an interface similar to require("esprima").parse.
const ast = recast.parse(code);

printByConsole(recast.print(ast).code, { tag: '修改之前' });

// Grab a reference to the function declaration we just parsed.
const add = ast.program.body[0];

// Make sure it's a FunctionDeclaration (optional).
const n = recast.types.namedTypes;
n.FunctionDeclaration.assert(add);

// If you choose to use recast.builders to construct new AST nodes, all builder
// arguments will be dynamically type-checked against the Mozilla Parser API.
const b = recast.types.builders;

// This kind of manipulation should seem familiar if you've used Esprima or the
// Mozilla Parser API before.
ast.program.body[0] = b.variableDeclaration('var', [
  b.variableDeclarator(add.id, b.functionExpression(
    null, // Anonymize the function expression.
    add.params,
    add.body,
  )),
]);

// Just for fun, because addition is commutative:
add.params.push(add.params.shift());

printByConsole(recast.print(ast).code, { tag: '修改之后' });
