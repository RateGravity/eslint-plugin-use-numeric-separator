import { Rule } from "eslint";
import { schema } from './common';

export const decimal: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'rule for long decimal numbers'
    },
    fixable: 'code',
    schema,
    messages: {
      invalid: 'long decimal literal without proper numeric separators'
    }
  },
  create: (context) => ({
    Literal: (node) => {
      const { raw, value } = node;

      if (
        typeof value !== 'number' ||
        raw === undefined ||
        raw.startsWith('0x') ||
        raw.startsWith('0o') ||
        raw.startsWith('0b') ||
        raw.includes('e+') ||
        raw.includes('e-')
      ) {
        return;
      }

      const { options } = context;
      const option = options && options[0]
      const threshold: number = option?.threshold || 5;
      const groupSize: number = option?.groupSize || 3;

      const [rawIntPart, fracPart] = raw.split('.');
      const intPart = rawIntPart.replace(/_/g, '')

      if (intPart.length >= threshold) {
        const pattern = new RegExp(`(?=(?:.{${groupSize}})*$)`);
        const correct =
          intPart.split(pattern).join('_') +
          (fracPart ? '.' + fracPart : '');

        if (raw !== correct) {
          context.report({
            node,
            messageId: 'invalid',
            fix: (fixer) => {
              return fixer.replaceText(node, correct);
            }
          });
        }
      }
    }
  })
}
