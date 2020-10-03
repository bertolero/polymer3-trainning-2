const { merge } = require('webpack-merge');
const commonConfig = require('./webpack/webpack.config.app.common');

module.exports = (env) => {
	const appTypeConfig = require(`./webpack/webpack.config.app.${env.type}.js`);

	const envConfig = require(`./webpack/webpack.config.env.${env.NODE_ENV}.js`);

	return merge(commonConfig, appTypeConfig, envConfig);
};
