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
		'linebreak-style': 0,
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'eol-last': 'error',
	},
};
