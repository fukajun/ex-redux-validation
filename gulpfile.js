var gulp = require('gulp');
var babelify = require('babelify')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var browserSync = require('browser-sync')
var plumber = require('gulp-plumber')
var notifier = require('node-notifier');
var es = require('event-stream');

function errorHandler(err) {
  var list = err.message.split(':')
  var head = list.shift()
  var body = list.join(':')
  var paths = head.split('/')
  console.log(err.message)
  notifier.notify({title: paths[paths.length - 1], message: body})
  this.emit('end')
}

notifier.notify({title: 'gulp', message: 'start'})
gulp.task('browser-sync',function(){
  browserSync({
    open: false,
    server: {
      baseDir: './'
    }
  });
});

var s = function() {
  return es.through(function(f) {
    console.log(f) // Inspect data
    console.log('Build finished') // Inspect data
    notifier.notify({title: 'pipe', message: 'finished'})
    this.emit('data', f);
  })
}

gulp.task('build', function() {
  return browserify({ entries: ['./index.js'] })
  .transform(babelify).bundle()
  .on('error', errorHandler)
  .on('transform', errorHandler)
  .pipe(plumber({errorHandler: errorHandler}))
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build'))
  .pipe(browserSync.reload({stream: true}))
  .pipe(s())
})

gulp.task('watch', function() {
  gulp.watch('./*.*', ['build'])
  gulp.watch('./components/*', ['build'])
  gulp.watch('./constants/*', ['build'])
  gulp.watch('./middlewares/*', ['build'])
  gulp.watch('./containers/*', ['build'])
  gulp.watch('./node_modules/*', ['build'])
  gulp.watch('./reducers/*', ['build'])
  gulp.watch('./actions/*', ['build'])
})

gulp.task('default', ['build', 'watch', 'browser-sync'])
