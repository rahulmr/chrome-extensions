var gulp = require('gulp');
var tslint = require('gulp-tslint');
var zip = require('gulp-zip');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

var path = {
  'src': ['./src/*.ts' ],
  'lintSrc': './src/**/*.ts',
  'dest': './apps/js/',
  'appSrc': ['./apps/**/*', 'manifest.json'],
  'appZip': '../../binaries/nse-pe-indicator.zip',
  'appDest': './'
}

gulp.task('enable-watch', function(){ webpackConfig.watch = true; });

gulp.task('webpack', function(){
  return gulp.src(path.src)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(path.dest));
});

gulp.task('watch', ['enable-watch', 'webpack']);

gulp.task('tslint', function(){
  return gulp.src(path.lintSrc)
    .pipe(tslint({configuration: './tslint.json'}))
    .pipe(tslint.report('prose'));
});

gulp.task('test', ['webpack', 'tslint']);

gulp.task('zip', function(){
  return gulp.src(path.appSrc)
    .pipe(zip(path.appZip))
    .pipe(gulp.dest(path.appDest))
});

gulp.task('pack', ['webpack', 'zip']);

gulp.task('default', ['webpack']);
gulp.task('release', ['pack']);

