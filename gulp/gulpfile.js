var gulp = require('gulp')
var jshint = require('gulp-jshint')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var condense = require('gulp-css-condense')

gulp.task('jshint', function () {
    return gulp.src('files/dev/js/*.js')
        .pipe(jshint({
            undef: true,
            devel: true,
            browser: true,
            esversion: 6,
            globals: {
                jQuery: true,
            },
        }))
        .pipe(jshint.reporter(''))
});

gulp.task('compressJs', function () {
    return gulp.src('files/dev/js/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('files/prod/js/'))
});

gulp.task('compressCss', function () {
    return gulp.src('files/dev/css/*.css')
        .pipe(concat('app.min.css'))
        .pipe(condense())
        .pipe(gulp.dest('files/prod/css/'))
});

gulp.task('watch', function () {
    gulp.watch('files/dev/js/*.js', ['jshint', 'compressJs']);
    gulp.watch('files/dev/css/*.css', ['compressCss']);
});

gulp.task('default', ['watch']);

