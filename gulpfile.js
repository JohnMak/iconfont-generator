/**
 * Created by johnmak on 17/11/2016.
 */

var gulp = require('gulp'),
    iconfont = require('gulp-iconfont'),
    normalize = require('normalize-svg-path'),
    consolidate = require('gulp-consolidate'),
    rename = require('gulp-rename');

var className = 'ca-ico',
    template = 'fontawesome-style',
    fontName = 'ca-icon-font';

gulp.task('default', function () {
    gulp.src('src/**/*.svg')
        .pipe(iconfont({
            fontName: fontName,
            prependUnicode: true, // recommended option
            normalize: true,
            // fontHeight: 1500
        }))
        .on('glyphs', function (glyphs) {
            var options = {
                className: className,
                fontName: fontName,
                fontPath: '../fonts/', // set path to font (from your CSS file if relative)
                glyphs: glyphs.map(mapGlyphs)
            };
            gulp.src("templates/" + template + ".css")
                .pipe(consolidate('lodash', options))
                .pipe(rename({basename: fontName}))
                .pipe(gulp.dest('dist/css/')); // set path to export your CSS

            // if you don't need sample.html, remove next 4 lines
            gulp.src("templates/" + template + ".html")
                .pipe(consolidate('lodash', options))
                .pipe(rename({basename: 'index'}))
                .pipe(gulp.dest('dist/')); // set path to export your sample HTML
        })
        .pipe(gulp.dest('dist/fonts/'));
});

function mapGlyphs(glyph) {
    return {name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0)}
}