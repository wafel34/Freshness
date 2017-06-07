/*---------------------------
        MODULES
---------------------------*/

var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify   = require('gulp-browserify'),
    minifyCss    = require('gulp-clean-css'),
    concat       = require('gulp-concat'),
    gulpIf       = require('gulp-if'),
    plumber      = require('gulp-plumber'),
    sass         = require('gulp-sass'),
    uglify       = require('gulp-uglify'),
    watch        = require('gulp-watch'),
    htmlmin      = require('gulp-htmlmin'),
    sourcemaps   = require('gulp-sourcemaps'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    browserSync  = require('browser-sync').create();

/*---------------------------
        TASKS
---------------------------*/

var sassSources,
    jsSources,
    htmlSources,
    cssDest,
    outputDir,
    env;

env = process.env.NODE_ENV || 'development';


if (env === 'development') {
    outputDir = 'builds/development';
} else {
    outputDir = 'builds/production';
}

jsSources    = 'components/scripts/*.js';
sassSources  = 'components/sass/**/style.sass';
htmlSources  = 'builds/development/*.html';

var onError = function (err) {
  console.log(err);
  this.emit('end');
};


//BROWSER-SYNC RELOAD
gulp.task('serv', function () {

    return browserSync.init({

        server: "./" + outputDir

    })
});

//SASS TO CSS
gulp.task('sass', function () {
    return gulp.src(sassSources)
            .pipe(plumber({
              errorHandler: onError
            }))
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(sourcemaps.write())
            .pipe(gulpIf(env === 'production', minifyCss()))
            .pipe(gulp.dest(outputDir + '/css'))
            .pipe(browserSync.stream())
});

//CONCAT JS

gulp.task('js', function () {
   return gulp.src(jsSources)
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(sourcemaps.init())
            .pipe(concat('main.js'))
            .pipe(browserify())
            .pipe(gulpIf(env === 'production', uglify()))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(outputDir + '/js'))
            .pipe(browserSync.stream())
});

//MINIFY HTML
gulp.task('minifyHTML', function () {
    return gulp.src(htmlSources)
            .pipe(gulpIf(env === 'production', htmlmin({
                collapseWhitespace: true
            })))
            .pipe(gulpIf(env === 'production', gulp.dest(outputDir)))
});

//COMPRESS IMAGES

gulp.task('images', function () {
    return gulp.src('builds/development/images/**/*.*')
            .pipe(gulpIf(env === 'production', imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false}],
                use: [pngquant()]
            })))
            .pipe(gulpIf(env === 'production', gulp.dest(outputDir + '/images')))
})


/*---------------------------
        WATCH TASK
---------------------------*/

gulp.task('watch', function () {
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/**/*.sass', ['sass']);
    gulp.watch('components/sass/**/*.scss', ['sass']);
    gulp.watch('builds/development/*.html', ['minifyHTML']);
    gulp.watch('builds/development/images/**/*.*', ['images']);
    gulp.watch('builds/development/*.html').on('change', browserSync.reload);
})


/*---------------------------
        DEFAULT TASK
---------------------------*/

gulp.task('default', ['serv', 'sass', 'minifyHTML', 'js', 'watch'])