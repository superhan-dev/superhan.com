import eslintTsConfig from '@configs/eslint-ts';
export default [
  ...eslintTsConfig,
  {
    ignores: ['pnpm-lock.yaml', 'pnpm-workspace.yaml', 'dist'], // 무시할 파일 패턴
  }
];