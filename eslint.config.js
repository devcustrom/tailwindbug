import eslintPluginAstro from 'eslint-plugin-astro';
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ["**/*.{js,mjs,cjs,ts,vue}"],
		rules: {
			'vue/multi-word-component-names': 'off',
			'no-irregular-whitespace': 'off'
		}
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs["flat/essential"],
	...eslintPluginAstro.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				module: 'readonly'
			},
			parserOptions: {
				commonjs: true
			}
		}
	},
	{
		files: ["**/*.vue"],
		rules: {
			'vue/multi-word-component-names': 'off',
			'no-irregular-whitespace': 'off'
		},
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
				commonjs: true
			}
		}
	},
];
