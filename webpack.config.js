const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
// const StylelintPlugin = require('stylelint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isPropd = !isDev;

const filename = (ext) =>
  isDev ? `[name]${ext}` : `[name].[contenthash]${ext}`;

const optimization = () => {
  const configObject = {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
    },
  };

  if (isPropd) {
    configObject.minimizer = [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: 'http://www.w3.org/2000/svg' },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
              //webp
            ],
          },
        },
        generator: [
          {
            // You can apply generator using `?as=webp`, you can use any name and provide more options
            preset: 'webp',
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: ['imagemin-webp'],
            },
          },
        ],
      }),
    ];
  }

  return configObject;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: `./js/${filename('.js')}`,
    clean: true,
    assetModuleFilename: `./img/${filename('[ext]')}`,
  },
  optimization: optimization(),
  devtool: isPropd ? false : 'source-map',
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, 'app'),
    open: true,
    hot: true,
    port: 3000,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // {
      //   test: /\.(jpg|png|svg|jpeg|gif|webp)$/,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: `./img/${filename('[ext]')}`,
      //   },
      // },
      {
        test: /\.ico$/,
        type: 'asset',
        generator: {
          filename: `./${filename('[ext]')}`,
        },
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: `./fonts/${filename('[ext]')}`,
        },
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: isPropd,
      },
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: `./css/${filename('.css')}`,
    }),
    new ImageminWebpWebpackPlugin({
      detailedLogs: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'app'),
        },
        {
          from: path.resolve(__dirname, 'src/img'),
          to: path.resolve(__dirname, 'app/img'),
        },
      ],
    }),
  ],
};
