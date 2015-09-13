var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var HOST = 'localhost';

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true
    }
}).listen(3000, HOST, function (err) {
        if (err) {
            console.log(err);
        }
        console.log('Listening ' + HOST + ' at port 3000');
    });
