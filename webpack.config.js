const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: path.join(__dirname, 'src'),
	entry: {
		main: './index'
	},
	output: {
		path: path.join(__dirname, '/build'),
		filename: '[name].js'
    },
    module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css!sass')
			},
			{
				test: /\.html$/,
				loader: 'raw'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'OZON test',
			template: './index.ejs',
			inject: 'head'
		}),
		new ExtractTextPlugin('[name].css', {
			allChunks: true
		})
	]
};
