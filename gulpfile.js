'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});


gulp.task('default', function () {
    return gulp.src('script/*.ts')
        .pipe($.typescript())
        .pipe($.ngAnnotate())
        .pipe(gulp.dest('build'))


});

