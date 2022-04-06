module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "prettier", "plugin:node/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {},
};
