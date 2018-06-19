/*eslint-env node */
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');

gulp.task('styles', (done) => {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.series('styles', 'lint'), () => {
    gulp.watch('sass/**/*.scss', gulp.series('styles'));
    gulp.watch('**/*.js', gulp.series('lint'));
    browserSync.init({
        server: './',
    });
});