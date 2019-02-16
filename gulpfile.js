'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var less = require('gulp-less');
var path = require('path');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });
var fileinclude = require('gulp-file-include');
var clean = require('gulp-rimraf');
//var concatCss = require('gulp-concat-css');

// Clean destination dir
gulp.task('clean', function() {
  return gulp.src(['./build/*'], {read: false})
         .pipe(clean());
});

// Coping special files to build folder
gulp.task('copy', function() {
  //gulp.src('./source/bower_components/bootstrap/fonts/**/*')
  //    .pipe(gulp.dest('./build/fonts/'));

  gulp.src('./source/img/**/*')
     .pipe(gulp.dest('./build/img/'));

  //gulp.src('./source/bower_components/bootstrap/dist/css/bootstrap.css')
  //    .pipe(gulp.dest('./build/css/'));

  //gulp.src('./source/bower_components/bootstrap/dist/js/bootstrap.js')
  //    .pipe(gulp.dest('./build/js/'));

  gulp.src('./source/bower_components/jquery/jquery.js')
      .pipe(gulp.dest('./build/js/'));
});

// compiling less files
gulp.task('less', function () {
  return gulp.src('./source/less/style.less')
    .pipe(less({
      paths: [ path.join(__dirname, './source/bower_components/bootstrap/less/') ],
      plugins: [autoprefix]
    }))
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.reload({stream:true}));
});

// building html templates
gulp.task('html', function() {
  gulp.src(['./source/index.html',
            './source/index2.html',
            './source/index3.html',
            './source/index4.html',
            './source/index5.html',
            './source/index6.html',
            './source/index7.html',
            './source/index8.html',
            './source/index9.html',
            './source/index10.html',
            './source/index11.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.reload({stream:true}));
});

// Livereload will up local server
// and inject all changes made
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'build/'
    }
  });
});

// watch files for changes and reload
gulp.task('watch', ['clean', 'copy', 'html', 'less', 'browser-sync'], function() {
  gulp.watch(['./source/*.html', './source/less/**/*.less', './source/js/**/*.js'], ['html', 'less']);
});

// Default task will clean build project
gulp.task('default', ['copy', 'clean'], function() {
  gulp.start('html', 'less');
});