const recast = require('recast');
const { printByConsole } = require('../utils');

const ast = recast.parse('');

printByConsole(recast.print(ast).code, { tag: '修改之前' });

const b = recast.types.builders;

// var a = 1;
ast.program.body[0] = b.variableDeclaration('var', [b.variableDeclarator(b.identifier('a'), b.literal(1))]);

// let b = 2;
ast.program.body[1] = b.variableDeclaration('let', [b.variableDeclarator(b.identifier('b'), b.literal(2))]);

// let b = 2;
ast.program.body[2] = b.variableDeclaration('const', [b.variableDeclarator(b.identifier('c'), b.literal('3'))]);

// let d;
ast.program.body[3] = b.variableDeclaration('let', [b.variableDeclarator(b.identifier('d'), null)]);

// var a = 1;
// let b = 2;
// const c = "3";
// let d;
printByConsole(recast.print(ast).code, { tag: '修改之后' });
