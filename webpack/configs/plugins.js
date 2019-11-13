const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const client = [
	new MiniCssExtractPlugin({
		filename: '[name].css'
	}),
	new CleanWebpackPlugin({
		verbose: true
	})
];

module.exports = {
	client
};
