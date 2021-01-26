import { Rule } from "eslint";
import { nondecimal } from "./nondecimal";

export const binary: Rule.RuleModule = nondecimal({
  name: 'binary',
  prefix: '0b',
  defaultThreshold: 5,
  defaultGroupSize: 4
});
