import gulp from 'gulp';
import babel from 'gulp-babel';
import jasmineNode from 'gulp-jasmine-node';
import istanbul from 'gulp-istanbul';
import injectModules from 'gulp-inject-modules';
import exit from 'gulp-exit';
import dotenv from 'dotenv';

dotenv.config();

process.env.NODE_ENV = 'test';

gulp.task('transpile', () => gulp.src('server/**/*.js'))
  .pipe(babel({
    presets: ['env', 'stage-2']
  }))
  .pipe(gulp.dest('build'));

gulp.task('coverage', () => {
  gulp.src('./build/**/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src('test/**/*.js')
        .pipe(babel())
        .pipe(injectModules())
        .pipe(jasmineNode())
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 70 } }))
        .on('error', () => exit())
        .on('end', () => exit())
        .pipe(exit());
    });
});
