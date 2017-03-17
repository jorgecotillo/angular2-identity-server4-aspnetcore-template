var isDevBuild = process.argv.indexOf('--env.prod') < 0;
var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var merge = require('webpack-merge');
var allFilenamesExceptJavaScript = /\.(?!js(\?|$))([^.]+(\?|$))/;
var definePlugin = require('./node_modules/webpack/lib/DefinePlugin');
var dev_settings = require('./config/dev.config');
var prod_settings = require('./config/prod.config');
var settings;

if(isDevBuild){
    settings = dev_settings;
}
else{
    settings = prod_settings;
}

// Configuration in common to both client-side and server-side bundles
var sharedConfig = {
    resolve: { extensions: [ '', '.js', '.ts' ] },
    output: {
        filename: '[name].js',
        publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
    },
    module: {
        loaders: [
            { test: /\.ts$/, include: /ClientApp/, loader: 'ts', query: { silent: true } },
            { test: /\.html$/, loader: 'raw' },
            { test: /\.css$/, loader: 'to-string!css' },
            { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'url', query: { limit: 25000 } }
        ]
    }
};

// Configuration for client-side bundle suitable for running in browsers
var clientBundleConfig = merge(sharedConfig, {
    entry: { 'main-client': './ClientApp/boot-client.ts' },
    output: { path: path.join(__dirname, './wwwroot/dist') },
    devtool: isDevBuild ? 'inline-source-map' : null,
    plugins: [
        new definePlugin({
                'process.env' : {
                    authority: JSON.stringify(settings.authority),
                    client_id: JSON.stringify(settings.client_id),
                    redirect_uri: JSON.stringify(settings.redirect_uri),
                    post_logout_redirect_uri: JSON.stringify(settings.post_logout_redirect_uri),
                    response_type: JSON.stringify(settings.response_type),
                    scope: JSON.stringify(settings.scope),

                    silent_redirect_uri: JSON.stringify(settings.silent_redirect_uri),
                    //automaticSilentRenew: true,
                    //silentRequestTimeout:10000,

                    filterProtocolClaims: JSON.stringify(settings.filterProtocolClaims),
                    loadUserInfo: JSON.stringify(settings.loadUserInfo),
                    service_endpoint: JSON.stringify(settings.service_endpoint)
                }
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./wwwroot/dist/vendor-manifest.json')
        })
    ].concat(isDevBuild ? [] : [
        // Plugins that apply in production builds only
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ])
});

// Configuration for server-side (prerendering) bundle suitable for running in Node
var serverBundleConfig = merge(sharedConfig, {
    entry: { 'main-server': './ClientApp/boot-server.ts' },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, './ClientApp/dist')
    },
    target: 'node',
    devtool: 'inline-source-map',
    externals: [nodeExternals({ whitelist: [allFilenamesExceptJavaScript] })] // Don't bundle .js files from node_modules
});

module.exports = [clientBundleConfig, serverBundleConfig];
