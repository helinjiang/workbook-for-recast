const recast = require('recast');
const { printByConsole, readFileSync } = require('../utils');

const code = readFileSync('./fixtures/x01.config.js');

const ast = recast.parse(code);

printByConsole(recast.print(ast).code, { tag: '修改之前' });

const b = recast.types.builders;

recast.visit(ast, {
  visitNewExpression: function (nodePath) {

    handleSomePlugin(nodePath.node);

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

printByConsole(recast.print(ast).code, { tag: '修改之后' });

function handleSomePlugin(node) {
  if (node.callee.name !== 'SomePlugin') {
    return;
  }

  // console.log(node);
  console.log(recast.print(node).code);

  if (node.arguments.length) {
    // 如果构造函数不为空
    const properties = node.arguments['0'].properties;

    // 判断 options 是否为空
    let isExistOptions = false;

    // 遍历属性
    properties.forEach((topLevelProperty, index) => {
      console.log('----', index, topLevelProperty.key.name);
      console.log(recast.print(topLevelProperty).code, '\n');

      if (topLevelProperty.key.name === 'definedInstanceDir') {
        topLevelProperty.value.value = topLevelProperty.value.value + '/just-a-demo.js';
      } else if (topLevelProperty.key.name === 'options') {
        isExistOptions = true;

        if (topLevelProperty.value.properties.length) {
          // 如果不为 {} 空对象
          const target = topLevelProperty.value.properties.find((i) => i.key.name === 'activeInstance');
          if (target) {
            // 如果存在对于的属性，则修改它
            target.value = b.literal('new.js');
          } else {
            // 如果不存在对于的属性，则追加它
            topLevelProperty.value.properties.push(b.objectProperty(b.identifier('activeInstance'), b.literal('new.js')));
          }
        } else {
          // 如果为 {} 空对象，则追加之
          topLevelProperty.value.properties.push(b.objectProperty(b.identifier('activeInstance'), b.literal('new.js')));
        }
      }
    });

    // 如果不存在 options 这个属性，则追加它
    if (!isExistOptions) {
      node.arguments['0'].properties.push(
        b.objectProperty(b.identifier('options'), b.objectExpression([
          b.objectProperty(b.identifier('activeInstance'), b.literal('new.js')),
        ])),
      );
    }
  } else {
    // 对象的属性列表
    // const properties = node.arguments['0'].properties;

    // 如果构造函数为空，则直接创建一个
    node.arguments.push(b.objectExpression([
      b.objectProperty(b.identifier('options'), b.objectExpression([
        b.objectProperty(b.identifier('activeInstance'), b.literal('new.js')),
      ])),
    ]));
  }

  // console.log(node);
  console.log(recast.print(node).code);
}
