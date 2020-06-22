const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		main: './assets/js/components/app-polymer.ts'
	},
	output: {
		path: path.resolve(__dirname, '../../public'),
		filename: '[name].js'
	},
	resolve: {
		// see below for an explanation // '[name].[chunkhash].js' put this if you want to get hashed files to cache bust
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: ['ts-loader', 'prettier-loader']
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					'postcss-loader'
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles.css' // 'style.[contenthash].css' put this if you want to get hashed files to cache bust
		}),
		new HtmlWebpackPlugin({
			hash: true,
			template: 'assets/view/index.html'
		}),
		new WebpackMd5Hash(),
		new CopyWebpackPlugin({
			patterns: [{
				from: '**/*.js',
				to: 'js/webcomponents',
				context: 'node_modules/@webcomponents/webcomponentsjs'
			}]
		})
	]
};
