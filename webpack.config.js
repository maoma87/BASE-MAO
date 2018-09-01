const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	mode: 'development',
	output: {
		filename: 'app.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						css: ['vue-style-loader', {
							loader: 'css-loader',
						}],
						js: ['babel-loader'],
					},
					cacheBusting: true,
				},
			},
			{
				test: /\.pug$/,
				oneOf: [
					// this applies to `<template lang="pug">` in Vue components
					{
						resourceQuery: /^\?vue/,
						use: ['pug-plain-loader']
					},
					// this applies to pug imports inside JavaScript
					{
						use: ['raw-loader', 'pug-plain-loader']
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'vue-style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[local]_[hash:base64:8]'
						}
					}
				]
			},
			{
				test: /\.sass$/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							indentedSyntax: true
						}
					}
				]
			},
		]
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new VueLoaderPlugin(),
		// new webpack.NamedModulesPlugin()
		new webpack.HotModuleReplacementPlugin(),
	],
	resolve: {
		/**
		 * The compiler-included build of vue which allows to use vue templates
		 * without pre-compiling them
		 */
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
		},
		extensions: ['*', '.vue', '.js', '.json'],
	},
	// webpack outputs performance related stuff in the browser.
	performance: {
		hints: false,
	},
}


if (process.env.NODE_ENV === 'production') {   // module.exports.devtool = '#source-map'   // http://vue-loader.vuejs.org/en/workflow/production.html   module.exports.plugins = (module.exports.plugins || []).concat([
	new webpack.DefinePlugin({
		'process.env': {NODE_ENV: '"production"'}
	})
	,
	new webpack.optimize.UglifyJsPlugin({
		sourceMap: false,
		compress: true,
		compress: {
			warnings: false
		},
		mangle: true,
	})
	,
	new webpack.LoaderOptionsPlugin({
		minimize: true
	})
}