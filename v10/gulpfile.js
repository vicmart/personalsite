const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const embedSvg = require('gulp-embed-svg');

sass.compiler = require('node-sass');
 
gulp.task('connect', function() {
  return connect.server({
    root: 'dist',
    livereload: true,
    port: 3000
  });
});
 
gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(embedSvg({
      root: './src/assets'
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  return gulp.src('./src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('js', function () {
  return gulp.src('./src/*.js')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('assets', function () {
  return gulp.src('./src/assets/*')
    .pipe(gulp.dest('./dist/assets'))
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch('./src/*.html', {ignoreInitial: false}, gulp.parallel('html'));
  gulp.watch('./src/*.scss', {ignoreInitial: false}, gulp.parallel('sass'));
  gulp.watch('./src/*.js', {ignoreInitial: false}, gulp.parallel('js'));
  gulp.watch('./src/assets/*', {ignoreInitial: false}, gulp.parallel('assets'));
  return;
});
 
gulp.task('default', gulp.parallel('connect', 'watch'));