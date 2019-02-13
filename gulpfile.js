"use strict";

var gulp = require('gulp');
var util = require('gulp-util');
var connect = require('gulp-connect'); // Runs a local dev server
var open = require('gulp-open'); // Open a URL in a web browser
var concat = require('gulp-concat'); // Concatenates files
var lint = require('gulp-eslint'); // Lint JS files
var uglify = require('gulp-uglify'); // Minify js
var uglifycss = require('gulp-uglifycss'); // Minify css

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        images: './src/images/*',
        fonts: './src/fonts/*',
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
            './src/js/script.js'
        ],
        js_custom: [
            './src/js/script.js'
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
        dist: './dist'
    },
    production: !!util.env.production
}

// Start a local development server
gulp.task('connect', function () {
    return connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', function () {
    return gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('html', function () {
    return gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
});

gulp.task('images', function () {
    return gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
});

gulp.task('fonts', function () {
    return gulp.src(config.paths.fonts)
        .pipe(gulp.dest(config.paths.dist + '/fonts'))
});

gulp.task('js', function () {
    return gulp.src(config.paths.js)
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.dist + '/js'))
});

gulp.task('css', function () {
    return gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest(config.paths.dist + '/css'))
});

gulp.task('lint', function () {
    return gulp.src(config.paths.js_custom)
        .pipe(lint())
        .pipe(lint.format());
});

gulp.task('build', gulp.parallel('html', 'fonts', 'images', 'js', 'css'));

gulp.task('watch', function () {
    gulp.watch([config.paths.html, config.paths.js, config.paths.css], gulp.series('build', 'lint', connect.reload()));
});

if (config.production) {
    gulp.task('default', gulp.series('build', 'lint'));
}
else {
    gulp.task('default', gulp.series('build', 'lint', 'connect', 'open', 'watch'));
}
