import eslintTsConfig from '@configs/eslint-ts';
import eslintTsReactConfig from '@configs/eslint-ts-react';

export default [
  ...eslintTsConfig,
  ...eslintTsReactConfig,
  {
    rules: {
      // "@typescript-eslint/no-explicit-any": "off"
    },
  },
];
