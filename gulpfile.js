'use strict'

var gulp        = require('gulp')
var browserify  = require('browserify')
var babelify    = require('babelify')
var source      = require('vinyl-source-stream')
var uglifyify   = require('uglifyify')

gulp.task('build', function () {
  return browserify({entries: './index.js', debug: true})
    .transform('babelify')
    .bundle()
    // .pipe(uglifyify())
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', ['build'], function () {
  gulp.watch('*.js', ['build'])
  gulp.watch('./actions/*.js', ['build'])
  gulp.watch('./components/*/*.js', ['build'])
  gulp.watch('./constants/*.js', ['build'])
  gulp.watch('./stores/*.js', ['build'])
})

gulp.task('default', ['watch'])