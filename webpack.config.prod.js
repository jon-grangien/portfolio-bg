const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

module.exports = {
	devtool: '',
	entry: [
		path.resolve(__dirname, 'src/index.ts')
	],
	output: {
	    path: path.resolve(ROOT_PATH, 'dist'),
	    filename: 'xyz-portfolio-bg.min.js',
	    library: 'xyz-portfolio-bg',
	    libraryTarget: 'umd',
			publicPath: '/'
	},
	resolve: {
	    extensions: ['.js', '.glsl', '.ts', '.vert', '.frag']
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new webpack.optimize.UglifyJsPlugin(),
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
      { test: /\.(glsl|frag|vert)$/, loader: 'raw-loader', exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader', exclude: /node_modules/ }
      // {
      //   test: /\.glsl$/,
      //   loader: 'webpack-glsl-loader'
      // },
    ]
  }
};
