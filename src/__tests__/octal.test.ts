import { RuleTester } from 'eslint';
import { octal } from '../octal';

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2021 } });

ruleTester.run('octal', octal, {
  valid: [
    'const n = 0o1234;',
    'const n = 0o1_234_567;',
    // with options:
    {
      code: 'const n = 0o1234_5670',
      options: [{ threshold: 7, groupSize: 4 }]
    },
    // ignores other bases:
    'const n = 123456',
    'const n = 0x123456',
    'const n = 0b101010101010'
  ],
  invalid: [
    {
      code: 'const n = 0o1234567',
      errors: [{ messageId: 'invalid' }],
      output: 'const n = 0o1_234_567'
    }
  ]
});
