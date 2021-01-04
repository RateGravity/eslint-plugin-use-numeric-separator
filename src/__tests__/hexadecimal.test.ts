import { RuleTester } from 'eslint';
import { hexadecimal } from '../hexadecimal';

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2021 } });

ruleTester.run('hexadecimal', hexadecimal, {
  valid: [
    'const n = 0x123abc',
    'const n = 0x12_3a_bc_de',
    // with options:
    {
      'code': 'const n = 0x12_345_678_9ab',
      'options': [{ threshold: 9, groupSize: 3 }]
    },
    // ignores other bases:
    'const n = 123456',
    'const n = 0b1010101010',
    'const n = 0o123456'
  ],
  invalid: [
    {
      code: 'const n = 0x123456789abc',
      errors: [{ messageId: 'invalid' }],
      output: 'const n = 0x12_34_56_78_9a_bc'
    }
  ]
});
