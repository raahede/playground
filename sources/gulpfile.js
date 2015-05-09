'use strict';

// Include dependencies
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
// Fetch import settings
var jsImports = require('./javascripts/gulp-imports');

// -------------------------------------------
// Sass tasks
// Using gulp-sass
// https://www.npmjs.com/package/gulp-sass

gulp.task('sass', function () {
  return gulp
    .src('sass/**/*.scss')
    // Initiate sourcemaps
    .pipe($.sourcemaps.init())
    // Convert sass into css
    .pipe($.sass({
      // sourcemap: true,
      errLogToConsole: true
    }))
    // Catch any SCSS errors and prevent them from crashing gulp
    .on('error', function (error) {
        console.error(error);
        this.emit('end');
    })
    // Prefix CSS3 properties for browsersupport
    // .pipe($.autoprefixer({
    //   browsers: ['last 2 versions']
    // }))
    // Write out source maps
    .pipe($.sourcemaps.write())
    // Save the CSS
    .pipe(gulp.dest('../assets/stylesheets'))
    // .pipe($.livereload());
});

gulp.task('sass-production', function () {
  return gulp
    .src('sass/**/*.scss')
    .pipe($.sass({
      outputStyle: 'compressed',
      errLogToConsole: true,
      includePaths: ['node_modules/susy/sass']
    }))
    // Catch any SCSS errors and prevent them from crashing gulp
    .on('error', function (error) {
        console.error(error);
        this.emit('end');
    })
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('../assets/stylesheets'));
});

// -------------------------------------------
// Setting up common tasks

// Watch Files For Changes & Reload
gulp.task('watch', function() {
  // $.livereload.listen({
  //   port: 8000
  // });
  gulp.watch('sass/**/*.scss', ['sass'])
});
