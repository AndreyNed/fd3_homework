import Config from 'webpack-config';

export default new Config().extend('webpack.base.config.js').merge({
  output: {
    //filename: 'bundle.js'
    filename: '[name].bundle.[hash].js'
  }
});
