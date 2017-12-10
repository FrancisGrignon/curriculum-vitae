"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs a local dev server
var open = require('gulp-open'); // Open a URL in a web browser
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); // Concatenates files
var lint = require('gulp-eslint'); // Lint JS files, including JSX
var uglify = require('gulp-uglify'); // Minify js
var uglifycss = require('gulp-uglifycss'); // Minify css
var minify = require('gulp-minify-html'); // Minify html

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: [
            './src/assets/js/jquery.min.js',
            './src/assets/js/jquery.magnific-popup.min.js',
            './src/assets/js/jquery.lettering.js',
            './src/assets/js/jquery.textillate.js',
            './src/assets/js/owl.carousel.min.js',
            './src/assets/js/jquery.waypoints.min.js',
            './src/assets/js/jquery.counterup.js',
            './src/assets/js/wow.min.js',
            './src/assets/js/smoothscroll.js',
            './src/assets/js/jquery.nav.js',
            './src/assets/js/validator.min.js',
            './src/assets/js/script.js',
            './src/assets/js/contact.js'
        ],
        js_custom: [
            './src/assets/js/script.js',
            './src/assets/js/contact.js'
        ],
        css: [
            './src/assets/css/bootstrap.min.css',
            './src/assets/css/animate.css',
            './src/assets/css/ionicons.min.css',
            './src/assets/css/owl.carousel.min.css',
            './src/assets/css/owl.transitions.css',
            './src/assets/css/magnific-popup.css',
            './src/assets/css/style.css',
        ],
        css_custom: './src/assets/css/style.css',
        dist: './dist',
        images: './src/assets/images/*',
        fonts: './src/assets/fonts/*',
        contact: './src/assets/contact/*',
    }
}

//Start a local development server
gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(minify())
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());
});

gulp.task('fonts', function () {
    gulp.src(config.paths.fonts)
        .pipe(gulp.dest(config.paths.dist + '/fonts'))
        .pipe(connect.reload());
});

gulp.task('contact', function () {
    gulp.src(config.paths.contact)
        .pipe(gulp.dest(config.paths.dist + '/contact'))
        .pipe(connect.reload());
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
        .pipe(lint({ config: 'eslint.config.json' }))
        .pipe(lint.format());
});

gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js_custom, ['js', 'lint']);
    gulp.watch(config.paths.css_custom, ['css', 'lint']);
});

gulp.task('default', ['html', 'images', 'fonts', 'js', 'css', 'contact', 'lint', 'open', 'watch']);