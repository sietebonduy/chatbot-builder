import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importEslint from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
       import: importEslint,
    },
    rules: {
        "import/order": ["error", {
            "groups": [
                ["builtin", "external"],
                ["internal"],
                ["parent"],
                ["sibling", "index"],
                ["type"],
            ],
            "pathGroups": [
                { "pattern": "react", "group": "external", "position": "before" },
                { "pattern": "@/**", "group": "internal" },
                { "pattern": "../**", "group": "parent" },
                { "pattern": "./**", "group": "sibling" },
            ],
            "pathGroupsExcludedImportTypes": ["react", "type"],
            "alphabetize": { "order": "asc", "caseInsensitive": false },
            "newlines-between": "always"
        }],
        "import/no-duplicates": [ "error", { "prefer-inline": true } ],
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
