const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const loader = require('sass-loader');

const BASE_JS = './src/client/js/';

module.exports = {
  entry: {
    main: BASE_JS + 'main.js',
    videoPlayer: BASE_JS + 'videoPlayer.js',
    recorder: BASE_JS + 'recorder.js',
    commentSection: BASE_JS + 'commentSection.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'js/[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        // webpack 은 역순으로 실행 1.sass-loader -> 2.css-loader -> 3.styles-loader
        // sass-loader : css로 변환해 줌
        // css-loader : css 파일들을 읽어서 브라우저에 적용시켜 줌(javascript에서 사용가능한 string으로 반환하여준다)
        // styles-loader : css-loader가 반환해준 값을 실제로 dom에 <style> 태그로 넣어준다.
        // MiniCssExtractPlugin : 개별 css파일로 저장됨
      },
    ],
  },
};
