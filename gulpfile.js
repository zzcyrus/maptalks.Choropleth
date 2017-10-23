const gulp = require('gulp'),
    pkg = require('./package.json'),
    eslint = require('gulp-eslint'),
    BundleHelper = require('maptalks-build-helpers').BundleHelper;
const bundleHelper = new BundleHelper(pkg);

gulp.task('build', () => {
    return bundleHelper.bundle('index.js');
});

gulp.task('minify', ['build'], () => {
    bundleHelper.minify();
});

gulp.task('lint', function () {
    gulp.src('index.js')
        .pipe(eslint({
            extends: 'maptalks',
            globals: {
                'Z': true
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
});

gulp.task('watch', ['build'], () => {
    gulp.watch(['index.js', './gulpfile.js'], ['build']);
});

/* 
const TestHelper = require('maptalks-build-helpers').TestHelper;
const testHelper = new TestHelper();
const karmaConfig = require('./karma.config.js');

gulp.task('test', ['build'], () => {
    testHelper.test(karmaConfig);
});

gulp.task('tdd', ['build'], () => {
    karmaConfig.singleRun = false;
    gulp.watch(['index.js'], ['test']);
    testHelper.test(karmaConfig);
}); */

gulp.task('default', ['watch']);