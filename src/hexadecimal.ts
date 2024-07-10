import { Rule } from 'eslint';
import { nondecimal } from './nondecimal';

export const hexadecimal: Rule.RuleModule = nondecimal({
  name: 'hexadecimal',
  prefix: '0x',
  defaultThreshold: 7,
  defaultGroupSize: 2
});
