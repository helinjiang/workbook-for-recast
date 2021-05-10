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

// const e1 = "41", e2 = "42";
ast.program.body[4] = b.variableDeclaration('const', [
  b.variableDeclarator(b.identifier('e1'), b.literal('41')),
  b.variableDeclarator(b.identifier('e2'), b.literal('42')),
]);

// const f = {
//   fkey1: "f1",
//   fkey2: 2
// };
ast.program.body[5] = b.variableDeclaration('const', [
  b.variableDeclarator(b.identifier('f'), b.objectExpression([
    b.objectProperty(b.identifier('fkey1'), b.literal('f1')),
    b.objectProperty(b.identifier('fkey2'), b.literal(2)),
  ])),
]);

// const g = [g1, 2, "3"];
ast.program.body[6] = b.variableDeclaration('const', [
  b.variableDeclarator(b.identifier('g'), b.arrayExpression([
    b.identifier('g1'),
    b.literal(2),
    b.literal('3'),
  ])),
]);

printByConsole(recast.print(ast).code, { tag: '修改之后' });
