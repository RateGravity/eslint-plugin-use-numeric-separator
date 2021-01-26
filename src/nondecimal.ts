import { Rule } from "eslint";
import { schema } from './common';

type Props = {
  name: string;
  prefix: string;
  defaultThreshold: number;
  defaultGroupSize: number;
}

export const nondecimal = ({ name, prefix, defaultThreshold, defaultGroupSize }: Props): Rule.RuleModule => ({
  meta: {
    type: 'suggestion',
    docs: {
      description: `rule for long ${name} numbers`
    },
    fixable: 'code',
    schema,
    messages: {
      invalid: `long ${name} literal without proper numeric separators`
    }
  },
  create: (context) => ({
    Literal: (node) => {
      const { raw, value } = node;

      if (
        typeof value !== 'number' ||
        raw === undefined ||
        !raw.startsWith(prefix)
      ) {
        return;
      }

      const { options } = context;
      const option = options && options[0]
      const threshold: number = option?.threshold || defaultThreshold;
      const groupSize: number = option?.groupSize || defaultGroupSize;

      const stripped = raw.replace(/_/g, '').substring(prefix.length);

      if (stripped.length >= threshold) {
        const pattern = new RegExp(`(?=(?:.{${groupSize}})*$)`);
        const correct = prefix + stripped.split(pattern).join('_');
        
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
})
