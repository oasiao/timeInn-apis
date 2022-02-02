/**
 * Com emprar aquest fitxer:
 *  - Comprova que les rutes estan correctes en els llocs
 * marcats amb // CHECK
 */

const gulp = require("gulp");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const imagemin = require("gulp-imagemin");
const del = require("del");


// Source and build directories
const paths = {
    // CHECK
    source: "./src",
    build: "./dist",
};


function javascriptBuildMain() {
    // CHECK - Posa aqui el nom del principal fitxer javascript

    let fileName = 'script.js'

    return (
        browserify({
            entries: [`${paths.source}/js/${fileName}`],
            transform: [babelify.configure({ presets: ["@babel/preset-env"] })],
        })
            .bundle()
            .pipe(source(`js/${fileName}`))
            // Turn it into a buffer!
            .pipe(buffer())
            // And uglify
            .pipe(uglify())
            .pipe(gulp.dest(`${paths.build}`))
    );
}
function javascriptBuildMain1() {
    // CHECK - Posa aqui el nom del principal fitxer javascript

    let fileName = 'scrollOnTop.js'

    return (
        browserify({
            entries: [`${paths.source}/js/${fileName}`],
            transform: [babelify.configure({ presets: ["@babel/preset-env"] })],
        })
            .bundle()
            .pipe(source(`js/${fileName}`))
            // Turn it into a buffer!
            .pipe(buffer())
            // And uglify
            .pipe(uglify())
            .pipe(gulp.dest(`${paths.build}`))
    );
}
function javascriptBuildMain2() {
    // CHECK - Posa aqui el nom del principal fitxer javascript

    let fileName = 'renderCartelera.js'

    return (
        browserify({
            entries: [`${paths.source}/js/${fileName}`],
            transform: [babelify.configure({ presets: ["@babel/preset-env"] })],
        })
            .bundle()
            .pipe(source(`js/${fileName}`))
            // Turn it into a buffer!
            .pipe(buffer())
            // And uglify
            .pipe(uglify())
            .pipe(gulp.dest(`${paths.build}`))
    );
}
function javascriptBuildMain3() {
    // CHECK - Posa aqui el nom del principal fitxer javascript

    let fileName = 'cargarSuscripcion.js'

    return (
        browserify({
            entries: [`${paths.source}/js/${fileName}`],
            transform: [babelify.configure({ presets: ["@babel/preset-env"] })],
        })
            .bundle()
            .pipe(source(`js/${fileName}`))
            // Turn it into a buffer!
            .pipe(buffer())
            // And uglify
            .pipe(uglify())
            .pipe(gulp.dest(`${paths.build}`))
    );
}

// Write our html task in a saperate function
function htmlBuild() {
    return gulp
        // CHECK - comprova la ruta dels fitxers HTML
        .src(`${paths.source}/*.html`)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.build));
}

// Processa el CSS
function cssBuild() {
    return gulp
        // CHECK - comprova la ruta dels fitxers CSS
        .src(`${paths.source}/**/css/*.css`)
        .pipe(postcss([cssnano()]))
        .pipe(gulp.dest(`${paths.build}`));
}

// Comprimeix les imatges
function imgSquash() {
    return gulp
        // CHECK - comprova la ruta dels fitxers d'imatge
        .src(`${paths.source}/img/**`)
        .pipe(imagemin())
        .pipe(gulp.dest(`${paths.build}/img`));
}


function cleanup() {
    // Neteja la carpeta dist
    return del([paths.build]);
}


exports.build = gulp.series(
    cleanup,
    htmlBuild,
    imgSquash,
    gulp.parallel(javascriptBuildMain, cssBuild, imgSquash),
    gulp.parallel(javascriptBuildMain1, cssBuild, imgSquash),
    gulp.parallel(javascriptBuildMain2, cssBuild, imgSquash),
    gulp.parallel(javascriptBuildMain3, cssBuild, imgSquash)
);