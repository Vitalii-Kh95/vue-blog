import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import eslintConfigPrettier from 'eslint-config-prettier';

// import { defineConfig } from 'eslint/config';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
// import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import typescriptEslint from 'typescript-eslint';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    extends: [
      pluginVue.configs['flat/recommended'],
      // ...typescriptEslint.configs.strict,
      vueTsConfigs.strictTypeChecked,
      eslintConfigPrettier
    ],
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser
      }
    },
    rules: {
      // your rules
      'vue/no-v-html': 'off'
    }
  },
  eslintConfigPrettier,
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**'])
);

// export default defineConfigWithVueTs(
//   {
//     name: 'app/files-to-lint',
//     files: ['**/*.{ts,mts,tsx,vue}']
//   },

//   globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

//   pluginVue.configs['flat/recommended'],
//   vueTsConfigs.recommended,

//   skipFormatting
// );
