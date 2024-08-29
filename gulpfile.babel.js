import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import gulpSass from 'gulp-sass';
import sassCompiler from 'sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';
import minify from 'gulp-minify';
import data from 'gulp-data';
import fs from 'fs';

// Set the Sass compiler
const sass = gulpSass(sassCompiler);

async function loadImagemin() {
    const imagemin = (await import('gulp-imagemin')).default;
    return imagemin;
}

gulp.task('imagemin', async () => {
    const imagemin = await loadImagemin();
    return gulp.src('src/images/*')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest('public/images/'));
});

gulp.task('pug', () => {
    return gulp.src('./src/pug/pages/**/*.pug')
        .pipe(plumber())
        .pipe(data(() => {
            return JSON.parse(fs.readFileSync('./src/data/example.json'));
        }))
        .pipe(pug())
        .pipe(gulp.dest('public'));
});

gulp.task('sass', () => {
    return gulp.src('src/scss/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/'));
});

gulp.task('scripts', () => {
    return browserify('src/js/index.js')
        .transform(babelify)
        .bundle()
        .pipe(source('index.js'))  // Mantén el nombre original
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(minify({
            ext: {
                min: '.js'  // Mantén la extensión .js sin agregar .min
            }
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/'));  // Coloca el archivo en public/
});


gulp.task('serve', gulp.series('pug', 'sass', 'scripts', 'imagemin', () => {
    browserSync.init({
        server: {
            baseDir: 'public'
        }
    });

    gulp.watch('src/pug/**/*.pug', gulp.series('pug')).on('change', browserSync.reload);
    gulp.watch('src/scss/**/*.scss', gulp.series('sass')).on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js', gulp.series('scripts')).on('change', browserSync.reload);
    gulp.watch('src/images/*', gulp.series('imagemin')).on('change', browserSync.reload);
}));

gulp.task('dev', gulp.series('serve'));
gulp.task('build', gulp.series('pug', 'sass', 'scripts', 'imagemin'));
gulp.task('default', gulp.series('dev'));
