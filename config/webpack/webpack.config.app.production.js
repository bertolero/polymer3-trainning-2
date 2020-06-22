const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'production',
	devtool: 'none',
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
						beautify: false
					}
				}
			})
		],
		usedExports: true,
		sideEffects: true
	}
};
