const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const sassdoc = require('sassdoc'); // Importa SassDoc

const paths = {
    scss: './scss/**/*.scss', 
    css: './css',
    sassdoc: './sassdoc' // Carpeta donde se generará la documentación
};

// Compila Sass
function compileSass() {
    return gulp.src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()])) 
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css));
}

// Genera documentación con SassDoc
function generateSassDoc() {
    return gulp.src(paths.scss)
        .pipe(sassdoc({ dest: paths.sassdoc }));
}

exports.sass = compileSass;
exports.sassdoc = generateSassDoc;
exports.default = gulp.series(compileSass, generateSassDoc);
