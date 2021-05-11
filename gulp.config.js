module.exports = function () {
  var config = {
    app: 'Front',
    dist: './dist/',
    src: './src/',
    sass: {
      src: ['src/sass/styles.scss'],
      dest: './dist/assets/css/',
      output: 'styles.css',
      watch: ['./src/sass/**/*.scss']
    },
    js: {
      src: ['./node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './node_modules/babel-polyfill/dist/polyfill.js',
        './src/js/*.js',
        './src/js/**/*.js'],
      dest: './dist/assets/js/',
      output: 'scripts.js',
      watch: ['./src/js/**/*.js'],
    },
    img: {
      src: './src/images/**/*',
      dest: './dist/assets/images/',
      watch: ['./src/images/**/*'],
    },
    font: {
      src: './src/fonts/**',
      dest: './dist/assets/fonts/',
      watch: ['./src/fonts/**'],
    },
    html: {
      src: ['./src/html/*.html', './src/html/pages/**/*.html'],
      dest: './dist/',
      watch: ['./src/html/**/*.html']
    },
  };
  return config;
}