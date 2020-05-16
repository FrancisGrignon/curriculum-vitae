"use strict";

const browserSync = require('browser-sync').create();
const concat = require('gulp-concat'); // Concatenates files
const eslint = require('gulp-eslint'); // Lint JS files
const htmlmin = require('gulp-htmlmin'); // Minify html
const order = require('gulp-order'); // Order files
const uglify = require('gulp-uglify'); // Minify js
const uglifycss = require('gulp-uglifycss'); // Minify css

const { dest, series, src, parallel, watch } = require('gulp');

var config = {
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        images: './src/images/*',
        fonts: './src/fonts/*',
        js: './src/js/**/*.js',
        js_custom: './src/js/script.js',
        css: './src/css/**/*.css',
        css_custom: './src/css/style.css',
        dist: './dist'
    }
}

// Start a local development server
function connect() {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html"
        }
    });
}

function html() {
    return src(config.paths.html)
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true, minifyJS: true }))
        .pipe(dest(config.paths.dist))
}

function images() {
    return src(config.paths.images)
        .pipe(dest(config.paths.dist + '/images'))
}

function fonts() {
    return src(config.paths.fonts)
        .pipe(dest(config.paths.dist + '/fonts'))
}

function js() {
    return src(config.paths.js)
        .pipe(order([
            'vendor/jquery.min.js',
            'vendor/*.js',
            'script.js'
        ]))
        .pipe(concat('bundle.js'))
        .pipe(uglify().on('error', function(e) {
            console.log(e);
         }))
        .pipe(dest(config.paths.dist + '/js'))
}

function css() {
    return src(config.paths.css)
        .pipe(order([
            'vendor/*.css',
            'style.css'
        ]))
        .pipe(concat('bundle.css'))
        .pipe(uglifycss().on('error', function(e) {
            console.log(e);
         }))
        .pipe(dest(config.paths.dist + '/css'))
}

function lint() {
    return src(config.paths.js_custom)
        .pipe(eslint())
        .pipe(eslint.format());
}

function watchFiles() {
    watch(config.paths.css_custom, series(css)).on('change', browserSync.reload);
    watch(config.paths.js_custom, series(lint, js)).on('change', browserSync.reload);
    watch(config.paths.html, series(html)).on('change', browserSync.reload);
}

const build = parallel(html, css, series(lint, js), fonts, images);
const watching = parallel(watchFiles, connect);

exports.build = build;
exports.default = series(build, watching);