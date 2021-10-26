module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:cypress/recommended'],
	parserOptions: {
		ecmaVersion: 13,
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'windows'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'eol-last': 'error',
	},
};
