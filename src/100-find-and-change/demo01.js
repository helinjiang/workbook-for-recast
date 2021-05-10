const recast = require('recast');
const path = require('path');
const fs = require('fs');
const { printByConsole } = require('../utils');

// Let's turn this function declaration into a variable declaration.
const code = fs.readFileSync(path.join(__dirname, 'fixtures/x01.config.js'), { encoding: 'utf8' });

// Parse the code using an interface similar to require("esprima").parse.
const ast = recast.parse(code);

// var a = 1;
printByConsole(recast.print(ast).code, { tag: '修改之前' });

recast.visit(ast, {
  visitNewExpression: function (nodePath) {
    const node = nodePath.node;
    console.log(nodePath.node);
    console.log(recast.print(node).code);

    // nodePath.node.arguments["0"].properties

    // It's your responsibility to call this.traverse with some
    // NodePath object (usually the one passed into the visitor
    // method) before the visitor method returns, or return false to
    // indicate that the traversal need not continue any further down
    // this subtree.
    this.traverse(nodePath);

    // ThisExpression nodes in nested scopes don't count as `this`
    // references for the original function node, so we can safely
    // avoid traversing this subtree.
    return false;
  },
});
