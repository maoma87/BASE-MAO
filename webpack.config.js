const webpack = require('webpack')
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
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.pug$/,
				loader: 'pug-plain-loader'
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					{
						loader: 'css-loader',
						options:{
							url: false
						}
					}
				]
			},
			{
				test: /\.sass$/,
				use: [
					'vue-style-loader',
					{
						loader: 'css-loader',
						options:{
							url: false
						}
					},
					{
						loader: 'sass-loader',
						options: {
							indentedSyntax: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new VueLoaderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
	resolve: {
		// The compiler-included build of vue which allows to use vue templates
		// without pre-compiling them
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


if (process.env.NODE_ENV === 'production') {
	new webpack.DefinePlugin({
		'process.env': {NODE_ENV: '"production"'}
	})
	new webpack.optimize.UglifyJsPlugin({
		sourceMap: false,
		compress: true,
		warnings: false,
		mangle: true
	})
	new webpack.LoaderOptionsPlugin({
		minimize: true
	})
}