/**
 * Created by Freeman on 2017/9/12.
 */
const gulp = require('gulp')
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const less = require('gulp-less')
const minifycss = require('gulp-minify-css') // CSS压缩
const concat = require('gulp-concat')       // 合并文件
const rename = require('gulp-rename')        // 重命名
const clean = require('gulp-clean')
const header = require('gulp-header')

const pkg = require('./package.json')
const paths = [
  'src/index.css'
]

gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean({force: true}))
})

gulp.task('dist', function () {
  const banner = [
    '/*!',
    ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)',
    ' * Copyright <%= new Date().getFullYear() %> MiFanFan, Inc.',
    ' * Licensed under the <%= pkg.license %> license',
    ' */',
    ''].join('\n')
  const processors = [
    autoprefixer({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ]
    }),
  ]
  gulp.src(paths)
    // .pipe(less())
    .pipe(postcss(processors))
    .pipe(concat('index.css'))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('dist'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist'))
})

gulp.task('default', ['clean'], function () {
  gulp.start('dist')
})