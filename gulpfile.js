var gulp = require('gulp');
var sass = require('gulp-sass');
var browsersync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function(){
  return gulp.src('./sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'))
    .pipe(browsersync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
  browsersync({
    server: {
      baseDir: 'source'
    },
  notify: false
  });
});

gulp.task('watch', function () {
  gulp.watch('sass/**/*.scss', gulp.parallel('sass'));
  gulp.watch('*.html', browsersync.reload);
  gulp.watch('js/**/*js.', browsersync.reload);
});
gulp.task('start', gulp.parallel('sass', 'browser-sync', 'watch'));