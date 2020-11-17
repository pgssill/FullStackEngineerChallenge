module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended" 
  ],
  parserOptions: {
     project: './tsconfig.json',
  },
  rules: {
    "import/prefer-default-export": "off",
    "class-methods-use-this": "off"
  }
};