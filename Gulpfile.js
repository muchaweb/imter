var gulp     = require('gulp'),
  compass    = require('gulp-compass'),
  jade       = require('gulp-jade'),
  coffee     = require('gulp-coffee'),
  minifycss  = require('gulp-minify-css'),
  uglify     = require('gulp-uglify'),
  imagemin   = require('gulp-imagemin'),
  rename     = require('gulp-rename'),
  clean      = require('gulp-rimraf'),
  concat     = require('gulp-concat'),
  notify     = require('gulp-notify'),
  cache      = require('gulp-cache'),
  gutil      = require('gulp-util'),
  preen      = require('preen'),
  livereload = require('gulp-livereload');

var paths = {
  templates : {
    src : 'src/templates/**/*.jade',
    dest : 'dist/'
  },
  styles : {
    src  : 'src/styles/**/*.scss',
    dest : 'dist/styles'
  },
  scripts : {
    src  : 'src/scripts/**/*.coffee',
    dest : 'dist/scripts'
  },
  images : {
    src  : 'src/images/**/*',
    dest : 'dist/images'
  }
}

// Templates
gulp.task('templates', function () {
  gulp.src(paths.templates.src)
  .pipe(jade({pretty:true}))
  .on('error', gutil.log)
  .pipe(gulp.dest(paths.templates.dest))
  .pipe(notify({ message: 'Templates done Master!' }));
});

// Scripts
gulp.task('scripts', function () {
  gulp.src(paths.scripts.src)
  .pipe(coffee())
  .on('error', gutil.log)
  .pipe(gulp.dest(paths.scripts.dest))
  .pipe(rename({ suffix: '.min' }))
  .pipe(uglify())
  .pipe(gulp.dest(paths.scripts.dest))
  .pipe(notify({ message: 'Scripts done Master!' }));
});

// Styles
gulp.task('styles', function () {
  gulp.src(paths.styles.src)
  .pipe(compass({
    config_file: './config.rb',
    css : paths.styles.dest,
    require : 'susy',
    sass: 'src/styles',
    errLogToConsole: true
  }))
  .on('error', gutil.log)
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(rename({ suffix: '.min' }))
  .pipe(minifycss())
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(notify({ message: 'Styles done Master!' }));
});

// Images
gulp.task('images', function() {
  return gulp.src(paths.images.src)
  .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
  .pipe(gulp.dest(paths.images.dest))
  .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
  .pipe(clean());
});

//Bower Preening
gulp.task('preen', function(cb){
  preen.preen({},cb);
});

// Default task
gulp.task('default', ['clean','preen'], function() {
  gulp.start('templates','styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {

  // Watch .jade files
  gulp.watch(paths.templates.src, ['templates']);

  // Watch .scss files
  gulp.watch(paths.styles.src, ['styles']);

  // Watch .js files
  gulp.watch(paths.scripts.src, ['scripts']);

  // Watch image files
  gulp.watch(paths.images.src, ['images']);

  // Create LiveReload server
  var server = livereload();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', function(file) {
    server.changed(file.path);
  });

});
