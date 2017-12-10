"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs a local dev server
var open = require('gulp-open'); // Open a URL in a web browser
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); // Concatenates files
var lint = require('gulp-eslint'); // Lint JS files
var uglify = require('gulp-uglify'); // Minify js
var uglifycss = require('gulp-uglifycss'); // Minify css

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        js: [
            './src/js/jquery.min.js',
            './src/js/jquery.magnific-popup.min.js',
            './src/js/jquery.lettering.js',
            './src/js/jquery.textillate.js',
            './src/js/owl.carousel.min.js',
            './src/js/jquery.waypoints.min.js',
            './src/js/jquery.counterup.js',
            './src/js/wow.min.js',
            './src/js/smoothscroll.js',
            './src/js/jquery.nav.js',
            './src/js/validator.min.js',
            './src/js/script.js',
            './src/js/contact.js'
        ],
        js_custom: [
            './src/js/script.js',
            './src/js/contact.js'
        ],
        css: [
            './src/css/bootstrap.min.css',
            './src/css/animate.css',
            './src/css/ionicons.min.css',
            './src/css/owl.carousel.min.css',
            './src/css/owl.transitions.css',
            './src/css/magnific-popup.css',
            './src/css/style.css',
        ],
        css_custom: './src/css/style.css',
        dist: './src'
    }
}

// Start a local development server
gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function () {
    gulp.src('src/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('js', function () {
    gulp.src(config.paths.js)
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.dist + '/js'))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(connect.reload());
});

gulp.task('lint', function () {
    return gulp.src(config.paths.js_custom)
        .pipe(lint())
        .pipe(lint.format());
});

gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js_custom, ['js', 'lint']);
    gulp.watch(config.paths.css_custom, ['css', 'lint']);
});

gulp.task('default', ['js', 'css', 'lint', 'open', 'watch']);