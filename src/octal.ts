import { Rule } from "eslint";
import { nondecimal } from "./nondecimal";

export const octal: Rule.RuleModule = nondecimal({
  name: 'octal',
  prefix: '0o',
  defaultThreshold: 5,
  defaultGroupSize: 3
});
