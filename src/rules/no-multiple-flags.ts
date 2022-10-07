import {
  AST_NODE_TYPES,
  TSESTree,
} from "@typescript-eslint/experimental-utils";
import { createRule } from "../util";

export default createRule({
  name: "no-multiple-flags",
  meta: {
    type: "problem",
    docs: {
      description: "",
      category: "Possible Errors",
      recommended: false,
    },
    schema: [],
    messages: {
      errorMultipleFlags: `Avoid using multiples flags with same char {{ name }}`,
      errorFlagStatic: `variable 'flag' should be static`,
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      "ClassDeclaration, ClassExpression"(
        node: TSESTree.ClassDeclaration | TSESTree.ClassExpression
      ) {
        const sourceCode = context.getSourceCode();
        const properties = node.body.body;
        let flagsVal: Array<string> = [];
        for (let element of properties) {
          if (element.type === AST_NODE_TYPES.ClassProperty) {
            let name = sourceCode.text.slice(...element.key.range);
            if (name === "flags") {
              if (element.static) {
                if (element?.value?.type === AST_NODE_TYPES.ObjectExpression) {
                  const flagProp = element.value.properties;
                  for (let flagEle of flagProp) {
                    if (
                      flagEle.type === AST_NODE_TYPES.Property &&
                      flagEle.value.type === AST_NODE_TYPES.CallExpression
                    ) {
                      const args = flagEle.value.arguments;
                      for (let argsEle of args) {
                        if (argsEle.type === AST_NODE_TYPES.ObjectExpression) {
                          const argsProps = argsEle.properties;
                          for (let prop of argsProps) {
                            if (prop.type === AST_NODE_TYPES.Property) {
                              let keyName = sourceCode.text.slice(
                                ...prop.key.range
                              );
                              let value = sourceCode.text.slice(
                                ...prop.value.range
                              );
                              if (keyName === "char") {
                                if (!flagsVal.includes(value)) {
                                  flagsVal.push(value);
                                } else {
                                  context.report({
                                    node,
                                    messageId: "errorMultipleFlags",
                                    data: {
                                      name: value,
                                    },
                                  });
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                context.report({
                  node,
                  messageId: "errorFlagStatic",
                });
              }
            }
          }
        }
      },
    };
  },
});
