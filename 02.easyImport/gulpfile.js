var gulp = require("gulp");
var postcss = require("gulp-postcss");
// PostCSSのプラグイン
var simpleVars = require("postcss-simple-vars");
var nested = require("postcss-nested");
var easyImport = require("postcss-easy-import");
// その他
var notify = require("gulp-notify");

gulp.task("compileCss", function() {
  // PostCSSのプラグインらを指定
  var processors = [
    easyImport({ glob: true }),
    simpleVars,
    nested,
  ];
  return gulp.src("src/styles.css") // styles.cssだけが対象
    .pipe(postcss(processors)) // PostCSSに渡して処理させる
    .pipe(gulp.dest("./dest")) // destに出力
    .pipe(notify("CSS compiled.")); // 通知
});

// CSSファイルの変更を検知してcompileCssを実行
gulp.task("watch", function () {
  gulp.watch("src/**/*.css", ["compileCss"]);
});

// 実行時にはcompileCssしてwatch
gulp.task("default", ["compileCss", "watch"]);
