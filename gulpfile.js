const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require("gulp-rename");

gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});
// Задача для обработки CSS
gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)") // Путь к вашим CSS файлам
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(postcss([autoprefixer()])) // Применение autoprefixer
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('src/css')) // Путь для сохранения обработанных файлов
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
})

gulp.task('default', gulp.parallel('watch','styles', 'server'));