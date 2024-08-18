const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass")(require('sass'));
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const babel = require('gulp-babel')
const esm = require('esm');
const webpack = require('webpack-stream')

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function images() {
    return src('app/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 80, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest('dist/images'))
}

function scripts() {
    return src(['app/js/main.js'])
        .pipe(webpack({
            mode: "production",
        }))
        .pipe(concat('main.min.js'))
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())

}

function styles() {
    return src("app/scss/style.scss")
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
};

function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ], { base: 'app' })
        .pipe(dest('dist'))
}

function watching() {
    watch(["app/scss/**/*.scss"], styles);
    watch(['app/js/**/*.js', "!app/js/main.min.js"], scripts);
    watch(["app/*.html"]).on('change', browserSync.reload);
}

function delDist() {
    return del('dist')
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.delDist = delDist;

exports.build = series(delDist, images, build);

exports.default = parallel(styles, scripts, browsersync, watching);