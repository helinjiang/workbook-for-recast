const recast = require('recast');
const { printByConsole } = require('../utils');

const ast = recast.parse('');

printByConsole(recast.print(ast).code, { tag: '修改之前' });

const b = recast.types.builders;

ast.program.body[0] = b.variableDeclaration('var', [b.variableDeclarator(b.identifier('a'), b.literal(1))]);
ast.program.body[1] = b.variableDeclaration('const', [b.variableDeclarator(b.identifier('b'), b.literal(2))]);

// var a = 1;
// const b = 2;
printByConsole(recast.print(ast).code, { tag: '修改之后' });
