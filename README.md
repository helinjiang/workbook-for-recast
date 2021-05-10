# workbook-for-recast

练习 recast 来操作 AST 等。

## 练习

请移步至 [src](./src) 目录下，安装练习的目的，分不同目录，各个目录下有 README.md 进行说明。

## 使用 recast

- [recast](https://github.com/benjamn/recast)
- [ast-types/def/core](https://github.com/benjamn/ast-types/blob/master/def/core.ts)
- [Demo - Online Parsing](https://esprima.org/demo/parse.html)
- [Parser API](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API)


### 如何看懂 API

API 的定义基本都在 [benjamn/ast-types](https://github.com/benjamn/ast-types) 这个项目里面。

以生产一段定义变量的代码为例，代码如下：

```js
const recast = require('recast');

const ast = recast.parse('');
const b = recast.types.builders;

// var a = 1;
ast.program.body[0] = b.variableDeclaration('var', [b.variableDeclarator(b.identifier('a'), b.literal(1))]);

// let b = 2;
ast.program.body[1] = b.variableDeclaration('let', [b.variableDeclarator(b.identifier('b'), b.literal(2))]);

// let b = 2;
ast.program.body[2] = b.variableDeclaration('const', [b.variableDeclarator(b.identifier('c'), b.literal('3'))]);

// let d;
ast.program.body[3] = b.variableDeclaration('let', [b.variableDeclarator(b.identifier('d'), null)]);
```

其中的 `b.variableDeclaration` 对于的接口定义如下，其定义了这个函数的参数：

```ts
export interface VariableDeclarationBuilder {
    (kind: "var" | "let" | "const", declarations: (K.VariableDeclaratorKind | K.IdentifierKind)[]): namedTypes.VariableDeclaration;
    from(params: {
        comments?: K.CommentKind[] | null;
        declarations: (K.VariableDeclaratorKind | K.IdentifierKind)[];
        kind: "var" | "let" | "const";
        loc?: K.SourceLocationKind | null;
    }): namedTypes.VariableDeclaration;
}
```

而 `K.VariableDeclaratorKind | K.IdentifierKind` 则需要继续调用 `builders` 的方法，例如 `c = 3` 就需要定义为 `b.variableDeclarator(b.identifier('c'), b.literal('3'))` 。


### 快捷调试

打开 [Demo - Online Parsing](https://esprima.org/demo/parse.html) 项目，可以在线查看语法解析的情况。

> 请选择 `Syntax` 模式。

## 学习资料

- [AST抽象语法树——最基础的javascript重点知识，99%的人根本不了解](https://segmentfault.com/a/1190000016231512)


