import {
  AST_NODE_TYPES,
  TSESTree,
} from "@typescript-eslint/experimental-utils";
import { createRule } from "../util";

export default createRule({
  name: "no-duplicate-args",
  meta: {
    type: "problem",
    docs: {
      description: "",
      category: "Possible Errors",
      recommended: false,
    },
    schema: [],
    messages: {
      errorMultipleArgs: `Avoid using same name arguments {{ name }}`,
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
        let flagsNameVal: Array<string> = [];

        for (let element of properties) {
          if (element.type === AST_NODE_TYPES.ClassProperty) {
            let name = sourceCode.text.slice(...element.key.range);
            if (
              name === "args" &&
              element?.value?.type === AST_NODE_TYPES.ArrayExpression
            ) {
              let values = element.value.elements;
              for (let objEle of values) {
                if (objEle.type === AST_NODE_TYPES.ObjectExpression) {
                  let objProp = objEle.properties;
                  for (let props of objProp) {
                    if (props.type === AST_NODE_TYPES.Property) {
                      let propName = sourceCode.text.slice(...props.key.range);
                      let propVal = sourceCode.text.slice(...props.value.range);
                      if (propName === "name") {
                        if (!flagsNameVal.includes(propVal))
                          flagsNameVal.push(propVal);
                        else {
                          context.report({
                            node,
                            messageId: "errorMultipleArgs",
                            data: {
                              name: propVal,
                            },
                          });
                        }
                        break;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
    };
  },
});
