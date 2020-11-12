module.exports = {
  "env": {
    "node": true,
    "commonjs": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "indent": ["warn", 2, { "SwitchCase": 1 }],
    "eol-last": ["warn", "always"]
  }
};
