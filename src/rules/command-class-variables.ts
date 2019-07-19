import {
    AST_NODE_TYPES,
    TSESTree    
} from '@typescript-eslint/experimental-utils';
import { createRule } from '../util';

export default createRule({
    name: 'command-class-variables',
    meta: {
        type: 'problem',
        docs: {
            description: '',
            category: 'Possible Errors',
            recommended: false,
        },
        schema: [],
        messages: {
            errorDescription: `variable 'static description' is not defined in class`,
            errorExample: `variable 'static examples' is not defined in class`,
            errorStaticDescription: `variable 'description' should be static`,
            errorStaticExample: `variable 'examples' should be static`
        }
    },
    defaultOptions: [],
    create(context) {
        return {
            'ClassDeclaration, ClassExpression'(node: TSESTree.ClassDeclaration | 
                TSESTree.ClassExpression) {
                    const sourceCode = context.getSourceCode();
                    const properties = node.body.body;
                    let errorDescription = false;
                    let errorStaticDescription = false;
                    let errorExample = false;
                    let errorStaticExample = false;

                    for(let element of properties){
                        if( element.type === AST_NODE_TYPES.ClassProperty) {
                            let name = sourceCode.text.slice(...element.key.range);
                            if(name === 'description') {
                                errorStaticDescription = !element.static;
                                errorDescription = false;
                                break;
                            }
                            else {
                                errorDescription = true;
                            }                                           
                        }
                    }

                    for(let element of properties){
                        if( element.type === AST_NODE_TYPES.ClassProperty) {
                            let name = sourceCode.text.slice(...element.key.range);
                            if(name === 'examples') {
                                errorStaticExample = !element.static;
                                errorExample = false;
                                break;
                            }
                            else {
                                errorExample = true;
                            }                                           
                        }
                    }

                    if(errorStaticDescription){
                        context.report({
                            node,
                            messageId: 'errorStaticDescription'
                        })
                    }
                    else if(errorDescription){
                        context.report({
                            node,
                            messageId: 'errorDescription'
                        })
                    }

                    if(errorStaticExample){
                        context.report({
                            node,
                            messageId: 'errorStaticExample'
                        })
                    }
                    else if(errorExample){
                        context.report({
                            node,
                            messageId: 'errorExample'
                        });
                    }
            }
        }
    },
});