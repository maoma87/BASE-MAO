module.exports = {
	"env": {
		"node": true,
		"browser": true,
		"es6": true
	},
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"extends": [
		"eslint:recommended",
		"plugin:vue/recommended"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"semi": [
			"error",
			"never"
		],
		"no-console": [
			"error",
			{
				"allow": [
					"warn",
					"error",
					"log"
				]
			}
		]
	}
};