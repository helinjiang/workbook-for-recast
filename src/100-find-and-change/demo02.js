const recast = require('recast');
const { printByConsole, readFileSync } = require('../utils');

const code = readFileSync('./fixtures/x01.config.js');

const ast = recast.parse(code);

printByConsole(recast.print(ast).code, { tag: '修改之前' });

const b = recast.types.builders;

recast.visit(ast, {
  visitNewExpression: function (nodePath) {
    const node = nodePath.node;
    console.log(nodePath.node);
    console.log(recast.print(node).code);

    const properties = nodePath.node.arguments['0'].properties;
    properties.forEach((item, index) => {
      console.log('----', index, item.key.name);
      console.log(recast.print(item).code, '\n');

      if (item.key.name === 'definedInstanceDir') {
        item.value.value = item.value.value + '/just-a-demo.js';
      } else if (item.key.name === 'options') {
        if (!item.value.properties.length) {
          console.log('options 为空!');
        }

        item.value.properties[0] = b.objectProperty(b.identifier('newAddedProperty'), b.literal('I am happy!'));
      }
    });

    console.log(recast.print(node).code);

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
