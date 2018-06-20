/*eslint-env node */
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const jasmine = require('gulp-jasmine-phantom');

gulp.task('styles', (done) => {
    gulp.src('sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('copy-html', (done) => {
    gulp.src('./index.html')
        .pipe(gulp.dest('./dist'));
    done();
});

gulp.task('copy-images', (done) => {
    gulp.src('img/*')
        .pipe(gulp.dest('dist/img'));
    done();
});

gulp.task('lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(browserSync.stream());
});

gulp.task('tests', (done) => {
    gulp.src(['**/*spec.js', '!node_modules/**'])
        .pipe(jasmine());
    done();
});

gulp.task('default', gulp.series('copy-html', 'copy-images', 'styles', 'lint'), () => {
    gulp.watch('sass/**/*.scss', gulp.series('styles'));
    gulp.watch('**/*.js', gulp.series('lint'));
    gulp.watch('/index.html', gulp.series('copy-html'));
    browserSync.init({
        server: './dist',
    });
});