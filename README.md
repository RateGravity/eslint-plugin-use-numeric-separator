# eslint-plugin-use-numeric-separator
`use-numeric-separator` is an ESLint plugin to enforce usage of the numeric separator (that '_' that can go in the middle of numbers) for large numbers.

```js
// Hard to read:
10000000
// Easy to read:
10_000_000
```

This plugin has support for decimal, hexadecimal, octal, and binary literals, and has separate configurable options for each base to specify the threshold at which to start applying the rule, and the number of digits per group.

With default options:

```js
// Incorrect:
10000000
0xDEADBEEF
0b10101010

// Correct:
10_000_000
0xDE_AD_BE_EF
0b1010_1010

// Also correct:
1000 // short number
100.0000001 // decimals are not split
6.02214e+23 // scientific notation is ignored
```

## Options
Each base has its own `threshold` and `groupSize` options with defaults. `threshold` is the number of digits above which the rule should apply, and `groupSize` is the number of digits between each separator. Here is an example `.eslintrc.json` showing every option with the default values:

```json
{
  ...
  "rules": {
    "use-numeric-separator": [
      "error",
      {
        "decimal": {
          "threshold": 5,
          "groupSize": 3
        },
        "hex": {
          "threhold": 7,
          "groupSize": 2
        },
        "binary": {
          "threshold": 5,
          "groupSize": 4
        },
        "octal": {
          "threshold": 5,
          "groupSize": 3
        }
      }
    ]
  }
}
```
