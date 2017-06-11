var gulp         = require('gulp'),
    gulpSequence = require('gulp-sequence'),
    inline       = require('gulp-inline'),
    uglify       = require('gulp-uglify');

// Inline uglify bunfle.js into html
gulp.task('inline-js', function() {
  return gulp.src('./dist/index.html')
    .pipe(inline({
      base: 'dist/',
      js: function() {
        return uglify({
          mangle: false
        });
      }
    }))
    .pipe(gulp.dest('./'));
});

// Let tasks above run sequentially
gulp.task('default', gulpSequence('inline-js'));
