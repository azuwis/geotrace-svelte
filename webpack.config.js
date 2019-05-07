const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  entry: {
    bundle: ['./src/main.js']
  },
  resolve: {
    extensions: ['.mjs', '.js', '.svelte']
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\/ip2region\/lib\/index\.js$/,
        loader: 'transform-loader?brfs'
      },
      {
        test: /\/ip2region\/lib\/index\.js$/,
        loader: 'string-replace-loader',
        options: {
          multiple: [
            {
              search: '!fs.existsSync(this.dbFilePath)',
              replace: 'false'
            },
            {
              search: 'fs.readFileSync(this.dbFilePath)',
              replace: 'fs.readFileSync(__dirname + "/../data/ip2region.db")'
            }
          ]
        }
      }
    ]
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devtool: prod ? false: 'source-map'
};
