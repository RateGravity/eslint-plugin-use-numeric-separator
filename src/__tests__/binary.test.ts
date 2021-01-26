import { RuleTester } from 'eslint';
import { binary } from '../binary';

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2021 } });

ruleTester.run('binary', binary, {
  valid: [
    'const n = 0b1010',
    'const n = 0b10_1010',
    // with options:
    {
      'code': 'const n = 0b1_010_101_010',
      'options': [{ threshold: 2, groupSize: 3 }]
    },
    // ignores other bases:
    'const n = 123456',
    'const n = 0x123456',
    'const n = 0o123456'
  ],
  invalid: [
    {
      code: 'const n = 0b101010101010',
      errors: [{ messageId: 'invalid' }],
      output: 'const n = 0b1010_1010_1010'
    }
  ]
});
