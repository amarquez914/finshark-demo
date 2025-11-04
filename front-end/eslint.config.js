import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config'

// export default defineConfig([
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{ts,tsx}'],
//     extends: [
//       js.configs.recommended,
//       tseslint.configs.recommended,
//       reactHooks.configs['recommended-latest'],
//       reactRefresh.configs.vite,
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//   },
// ])

// https://medium.com/@jawahiirn/code-formatting-configuration-for-react-vite-0c8a99fb8967
export default defineConfig([
  globalIgnores(['dist']), // Ignore build output folder
  {
    extends: [
      js.configs.recommended, // Recommended JavaScript rules
      ...tseslint.configs.recommended, // Recommended TypeScript rules
      prettier, // Disable conflicting ESLint rules
    ],
    files: ['**/*.{ts,tsx}'], // Apply to TypeScript files
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript 2020 syntax
      globals: globals.browser, // Enable browser global variables
    },
    plugins: {
      'react-hooks': reactHooks, // React hooks rules
      'react-refresh': reactRefresh, // React Fast Refresh rules
      prettier: prettierPlugin, // Integrate Prettier into ESLint
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Apply recommended React Hooks rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // React Fast Refresh rule
      ],
      'prettier/prettier': 'warn', // Enforce Prettier formatting
    },
  }
]);