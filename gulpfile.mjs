import gulp from "gulp";
import concat from "gulp-concat";
import prefix from "gulp-autoprefixer";
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import pug from "gulp-pug";
import sourcemaps from "gulp-sourcemaps";
import uglify from "gulp-uglify";
import notify from "gulp-notify";

// HTML Task
gulp.task("html", function () {
    return gulp.src("stage/html/*.pug")
            .pipe(pug({pretty: true}))
            .pipe(gulp.dest("dist"))
            // .pipe(notify("HTML Task is Done"))
});

// CSS Task
gulp.task("css", function () {
    return gulp.src(["stage/css/**/*.css", "stage/css/**/*.scss"])
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
            .pipe(prefix())
            .pipe(concat("main.css"))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("dist/css"))
            // .pipe(notify("CSS Task is Done"))
});

// JS Task
gulp.task("js", function () {
    return gulp.src("stage/js/*.js")
            .pipe(uglify())
            .pipe(gulp.dest("dist/js"))
            // .pipe(notify("JS Task is Done"))
});

// Watch Task
gulp.task("watch", function () {
    gulp.watch("stage/html/**/*.pug", gulp.series("html"));
    gulp.watch("stage/css/**/*.scss", gulp.series("css"));
    // gulp.watch("stage/js/**/*.js", gulp.series("js"));
});

// Default Task
gulp.task("default", gulp.series("watch"));