module.exports = {
  root: true,
  extends: '@react-native',
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          '@': './src'
        }
      }
    }
  },
  // 다음 규칙은 babel-plugin-module-resolver를 사용하는 경우 발생하는 ESLint 경고를 무시합니다
  rules: {
    'import/no-unresolved': 'off'
  }
};
