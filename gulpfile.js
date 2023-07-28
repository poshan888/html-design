const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const minify = require('gulp-minify');
const webp = require('gulp-webp');

// SASS Compiler
gulp.task('buildStyles', function () {
  return gulp.src([
    './assets/scss/style.scss',
    ])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(minify({noSource: true}))
    .pipe(concat('style-min.css').on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
});

// Client javascript
gulp.task("javascript", function () {
  return gulp.src([
    './node_modules/aos/dist/aos.js',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/@popperjs/core/dist/umd/popper.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './assets/js/custom.js',
    ], { allowEmpty: true }) 
    .pipe(concat('javascript-lib.js'))
    .pipe(minify({noSource: true}).on('error', sass.logError))
    .pipe(gulp.dest('./assets/js').on('error', sass.logError))
    .pipe(browserSync.stream().on('error', sass.logError));
});

// Optimize Images
gulp.task('imgwebp', () =>
    gulp.src('./assets/images/**/*.{jpg,jpeg,png}')
    .pipe(webp().on('error', sass.logError))
    .pipe(gulp.dest('./assets/images/webp').on('error', sass.logError))
);

// Watch Task
gulp.task('serve', function() {
  gulp.watch("./assets/scss/**/*.scss", gulp.series('buildStyles'));
  gulp.watch("./assets/js/*.js", gulp.series('javascript'));
  gulp.watch("./assets/images/*.{jpg,png}", gulp.series('imgwebp'));
  gulp.watch("*.html").on('change', browserSync.reload); 
  gulp.watch("*.scss").on('change', browserSync.reload); 
  browserSync.init({
      server: {
        index: "/index.html"
     }
  });
});

// To make all the tasks default for running
gulp.task('default', gulp.series(['buildStyles', 'javascript', 'imgwebp', 'serve']));