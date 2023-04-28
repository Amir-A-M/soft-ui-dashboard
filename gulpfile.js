var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS: './assets/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/style.scss',
  SCSS: './assets/scss/**/**',
  JS_TOOLKIT_SOURCES: './assets/js/app.js',
  JS: './assets/js/'
};

gulp.task('compile-scss', function() {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS));
});

gulp.task('minify-js', function () {
  return gulp.src(Paths.JS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(Paths.JS));
});

gulp.task('watch', function() {
  gulp.watch(Paths.SCSS, gulp.series('compile-scss'));
  gulp.watch(Paths.JS_TOOLKIT_SOURCES, gulp.series('minify-js'));
});

gulp.task('open', function() {
  gulp.src('pages/dashboard.html')
    .pipe(open());
});

gulp.task('open-app', gulp.parallel('open', 'watch'));