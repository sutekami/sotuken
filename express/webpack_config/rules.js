module.exports = [
  {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'assets/resource',
  },
  {
    test: /\.(csv|tsv)$/i,
    use: ['csv-loader'],
  },
  {
    test: /\.xml$/i,
    use: ['xml-loader'],
  },
  {
    test: /\.ts?$/,
    use: ['ts-loader'],
    exclude: /node_modules/,
  },
];
