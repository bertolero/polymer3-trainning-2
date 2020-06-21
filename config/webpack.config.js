const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.app.common');

module.exports = (env) => {

	console.log(JSON.stringify(env.NODE_ENV))

	const envConfig = require(`./webpack.config.app.${env.NODE_ENV}.js`);

	return webpackMerge(commonConfig, envConfig);

};
