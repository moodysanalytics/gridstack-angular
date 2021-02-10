'use strict'

var gulp = require('gulp');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var header = require('gulp-header');

var bases = {
 app: 'src/',
 dist: 'dist/',
};

var paths = {
 scripts: ['**/*.js']
};

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.author %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

// Delete the dist directory
gulp.task('clean', function () {
    return gulp.src(bases.dist, { allowEmpty: true })
 .pipe(clean());
});

// Process scripts and concatenate them into one output file
gulp.task('scripts', async function() {
 gulp.src(paths.scripts, {cwd: bases.app})
 .pipe(jshint())
 .pipe(jshint.reporter('default'))
 .pipe(eslint())
 .pipe(eslint.format())
 .pipe(uglify())
 .pipe(concat('gridstack-angular.min.js'))
 .pipe(header(banner, { pkg : pkg } ))
 .pipe(gulp.dest(bases.dist));

 gulp.src(paths.scripts, {cwd: bases.app})
 .pipe(concat('gridstack-angular.js'))
 .pipe(header(banner, { pkg : pkg } ))
 .pipe(gulp.dest(bases.dist));
});

// Define the default task as a sequence of the above tasks
gulp.task('default', gulp.series('clean', gulp.parallel('scripts')));