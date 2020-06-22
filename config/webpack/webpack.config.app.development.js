const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	optimization: {
		splitChunks: { chunks: 'all', minSize: 0 },
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {},
					warning: true,
					mangle: false,
					output: {
						beautify: true
					}
				}
			})
		],
		usedExports: true,
		sideEffects: true
	}
};
