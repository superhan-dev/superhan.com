import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  {
    plugins: {
      'unused-imports': unusedImports,
    },
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
  },
  {
    ignores: ['eslint.config.js', '**/dist/', '**/node_modules/'], // Adjust ignore patterns as needed
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // 브라우저 글로벌 변수
      parser: tsParser, // TypeScript 파서 설정
      sourceType: 'module', // 모듈 사용
    },
    files: ['**/*.{ts,tsx}'], // TypeScript 파일 패턴
    rules: {
      // 여기에 규칙 추가 가능
      '@typescript-eslint/no-explicit-any': 'warn', // 이 규칙을 warn으로 변경
      '@typescript-eslint/no-unused-vars': 'warn',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  }
);
