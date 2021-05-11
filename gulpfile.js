var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    extender = require('gulp-html-extend'),
    inline_base64 = require('gulp-inline-base64'),
    config = require('./gulp.config')();

$ = require('gulp-load-plugins')({lazy: true});


gulp.task('styles', function () {
    return gulp
        .src(config.sass.src)
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe($.concat(config.sass.output))
        .pipe(gulp.dest(config.sass.dest))
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe($.cleanCss())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest(config.sass.dest))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function () {
    return gulp
        .src(config.js.src)
        .pipe($.concat(config.js.output))
        .pipe(gulp.dest(config.js.dest))
        .pipe(browserSync.reload({stream: true}))
        .pipe($.uglify())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest(config.js.dest));
});

gulp.task('images:clean', function () {
    return gulp
        .src(config.img.dest)
        .pipe($.clean());
});

gulp.task('images', ['images:clean'], function () {
    return gulp
        .src(config.img.src)
        .pipe($.changed('images'))
        .pipe($.imagemin({
            // Lossless conversion to progressive JPGs
            progressive: true,
            // Interlace GIFs for progressive rendering
            interlaced: true
        }))
        .pipe(gulp.dest(config.img.dest))
        .pipe($.size({title: 'images'}));
});

gulp.task('fonts:clean', function () {
    return gulp
        .src(config.font.dest)
        .pipe($.clean());
});

gulp.task('fonts', ['fonts:clean'], function () {
    return gulp
        .src(config.font.src)
        .pipe(gulp.dest(config.font.dest));
});

gulp.task('html', [], function () {
    return gulp.src(config.html.src)
        .pipe(extender({annotations: true, verbose: false})) // default options
        .pipe(gulp.dest(config.html.dest));
});

gulp.task('browser-sync', ['styles', 'scripts'], function () {
    browserSync({
        server: {
            baseDir: config.dist,
            injectChanges: true // this is new
        },
        port: 8080,
        open: false
    });
});

gulp.task('watch', function () {
    // Watch .html files
    gulp.watch(config.html.watch, ['html', browserSync.reload]);
    gulp.watch(config.html.watch).on('change', browserSync.reload);
    // Watch .sass files
    gulp.watch(config.sass.watch, ['styles', browserSync.reload]);
    // Watch .js files
    gulp.watch(config.js.watch, ['scripts', browserSync.reload]);
    // Watch image files
    gulp.watch(config.img.watch, ['images', browserSync.reload]);
    // Watch font files
    gulp.watch(config.font.watch, ['fonts', browserSync.reload]);
});

gulp.task('default', function () {
    gulp.start(
        'styles',
        'scripts',
        'images',
        'fonts',
        'html',
        'browser-sync',
        'watch'
    );
});
