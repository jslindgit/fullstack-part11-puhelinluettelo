module.exports = {
	env: {
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 12,
	},
	plugins: ['react'],
	rules: {
		eqeqeq: 'error',
		'no-trailing-spaces': 'error',
		'object-curly-spacing': ['error', 'always'],
		'arrow-spacing': ['error', { before: true, after: true }],
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		'no-console': 0,
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
	},
}
