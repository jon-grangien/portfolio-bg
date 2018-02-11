const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

module.exports = {
	devtool: 'source-map',
	entry: [
		'webpack-hot-middleware/client',
    './src/index.dev.js'
  ],
	output: {
	    path: path.resolve(ROOT_PATH, 'public'),
	    filename: 'bundle.js',
      publicPath: '/'
	},
	resolve: {
	    extensions: ['.js', '.ts', '.glsl', '.vert', '.frag']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	],
	module: {
	loaders: [
    { 
      test: /\.ts$/, 
      enforce: 'pre', 
      loader: 'tslint-loader' 
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: [ 'es2015' ]
      }
    },
    { 
      test: /\.ts|\.tsx$/,
      loader: 'ts-loader', 
      exclude: '/node_modules/' 
    },
    { test: /\.(glsl|frag|vert)$/, loader: 'glsl-loader', exclude: /node_modules/ }
    // {
    //   test: /\.glsl$/,
    //   loader: 'webpack-glsl-loader'
    // },
  ]
}
}
