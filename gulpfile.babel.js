import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import babel from 'gulp-babel';
import jasmineNode from 'gulp-jasmine-node';
import istanbul from 'gulp-istanbul';
import injectModules from 'gulp-inject-modules';
import gulpSequence from 'gulp-sequence';
import exit from 'gulp-exit';
import dotenv from 'dotenv';

dotenv.config();

// process.env.NODE_ENV = 'test';

gulp.task('nodemon', () => {
  nodemon({
    script: 'build/server.js',
    ext: 'js',
    ignore: ['README.md', 'node_modules/**', '.DS_Store'],
    tasks: ['build'],
    watch: ['server']
  });
});

gulp.task('copy', () => gulp.src('server/**/*.*')
  .pipe(gulp.dest('build')));

gulp.task('transpile', () => gulp.src('./server/**/*.js')
  .pipe(babel({
    presets: ['env', 'stage-2']
  }))
  .pipe(gulp.dest('build')));

gulp.task('coverage', () => {
  process.env.NODE_ENV = 'test';
  gulp.src('./build/**/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src('./build/tests/*.js')
        .pipe(babel())
        .pipe(injectModules())
        .pipe(jasmineNode())
        .pipe(istanbul.writeReports({ dir: './server/tests/coverage' }))
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 70 } }))
        .on('error', () => exit())
        .on('end', () => exit())
        .pipe(exit());
    });
});

gulp.task('build', gulpSequence('copy', 'transpile'));
