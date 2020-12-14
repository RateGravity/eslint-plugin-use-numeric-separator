import { Rule } from 'eslint';

type Base = {
  prefix?: string;
  schemaProp: string;
  defaultThreshold: number;
  defaultGroupSize: number;
};

const bases: Base[] = [
  {
    prefix: '0b',
    schemaProp: 'binary',
    defaultThreshold: 5,
    defaultGroupSize: 4
  },
  {
    prefix: '0x',
    schemaProp: 'hex',
    defaultThreshold: 7,
    defaultGroupSize: 2
  },
  {
    prefix: '0o',
    schemaProp: 'octal',
    defaultThreshold: 5,
    defaultGroupSize: 3
  },
  {
    schemaProp: 'decimal',
    defaultThreshold: 5,
    defaultGroupSize: 3
  }
];

const schemaBaseProps = {
  type: 'object',
  properties: {
    threshold: {
      type: 'number'
    },
    groupSize: {
      type: 'number'
    }
  }
};

export const useNumericSeparator: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'long numeric literals should use numeric separators for clarity'
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          decimal: schemaBaseProps,
          binary: schemaBaseProps,
          octal: schemaBaseProps,
          hex: schemaBaseProps
        }
      }
    ],
    messages: {
      invalid: 'long numeric literal without proper numeric separators'
    }
  },
  create: (context) => ({
    Literal: (node) => {
      const { raw, value } = node;

      if (
        typeof value !== 'number' ||
        raw === undefined ||
        raw.includes('e+') ||
        raw.includes('e-')
      ) {
        return;
      }

      const {
        schemaProp,
        defaultThreshold,
        defaultGroupSize,
        prefix
      } = bases.find((base) => !base.prefix || raw.startsWith(base.prefix))!;
      const { options } = context;
      const option = options && options[0] && options[0][schemaProp];
      const threshold: number =
        (option && option.threshold) || defaultThreshold;
      const groupSize: number =
        (option && option.groupSize) || defaultGroupSize;

      const [rawIntPart, fracPart] = raw.split('.');
      const intPart = rawIntPart
        .replace(/_/g, '')
        .substring(prefix ? prefix.length : 0);

      if (intPart.length >= threshold) {
        const pattern = new RegExp(`(?=(?:.{${groupSize}})*$)`);
        const correct =
          (prefix || '') +
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
};
