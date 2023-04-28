export default {
    "env": {
        "browser": true,
        "es2021": true
    },
    "plugins": ["@typescript-eslint"],
    "extends": [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:prettier/recommended'
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": "2021"
    },
    "rules": {
    }
}
