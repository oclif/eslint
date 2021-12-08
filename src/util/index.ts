import { ESLintUtils } from '@typescript-eslint/experimental-utils';

export const createRule = ESLintUtils.RuleCreator(
  name =>
    `https://github.com/moulikcipherx/eslint-plugin-oclif/blob/main/docs/rules/${name}.md`,
);
