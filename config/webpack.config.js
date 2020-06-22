const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack/webpack.config.app.common');

module.exports = (env) => {
	const envConfig = require(`./webpack/webpack.config.app.${env.NODE_ENV}.js`);

	return webpackMerge(commonConfig, envConfig);

};
