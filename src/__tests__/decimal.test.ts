import { RuleTester } from 'eslint';
import { decimal } from '../decimal';

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2021 } });

ruleTester.run('decimal', decimal, {
  valid: [
    // integers:
    'const n = 1;',
    'const n = 12;',
    'const n = 123;',
    'const n = 1234;',
    'const n = 12_345;',
    'const n = 123_456;',
    'const n = 1_234_567;',
    'const n = 12_345_678;',
    'const n = 123_456_789;',
    // decimals below cutoff:
    'const n = 1.2;',
    'const n = 1.23;',
    'const n = 1.234;',
    'const n = 1.2345;',
    'const n = 1.23456;',
    // decimals above cutoff:
    'const n = 12_345.12345;',
    // negatives:
    'const n = -123;',
    'const n = -1234;',
    'const n = -12_345;',
    'const n = -123_456;',
    'const n = -1_234_567;',
    'const n = -1.234567;',
    'const n = -12_345.12345;',
    // with options:
    {
      code: 'const n = 123456;',
      options: [{ threshold: 7 }]
    },
    {
      code: 'const n = 1_234;',
      options: [{ threshold: 4 }]
    },
    {
      code: 'const n = 1_23_45_67_89',
      options: [{ groupSize: 2 }]
    },
    // scientific notation is ignored:
    'const n = 5e+123',
    // ignores other bases:
    'const n = 0x123456789',
    'const n = 0b010101010101',
    'const n = 0o1234567012345'
  ],
  invalid: [
    // integers:
    {
      code: 'const n = 12345;',
      errors: [{ messageId: 'invalid' }],
      output: 'const n = 12_345;'
    },
    {
      code: 'const n = 123456;',
      errors: [{ messageId: 'invalid' }],
      output: 'const n = 123_456;'
    },
    {
      code: 'const n = 1234567;',
      errors: [{ messageId: 'invalid' }],
      output: 'const n = 1_234_567;'
    },
    {
      code: 'const n = 12345678;',
      errors: [{ messageId: 'invalid' }],
      output: 'const n = 12_345_678;'
    },
    {
      code: 'const n = 123456789;',
      errors: [{ messageId: 'invalid' }],
      output: 'const n = 123_456_789;'
    },
    // _ in the wrong place:
    {
      code: 'const n = 12_34_56;',
      errors: [{ messageId: 'invalid' }],
      output: 'const n = 123_456;'
    },
    // decimals:
    {
      code: 'const n = 12345.12345;',
      errors: [{ messageId: 'invalid' }],
      output: 'const n = 12_345.12345;'
    },
    // negatives:
    {
      code: 'const n = -123456789;',
      errors: [{ messageId: 'invalid' }],
      output: 'const n = -123_456_789;'
    },
    {
      code: 'const n = -12345.12345;',
      errors: [{ messageId: 'invalid' }],
      output: 'const n = -12_345.12345;'
    }
  ]
});
