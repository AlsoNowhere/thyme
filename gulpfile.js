
// const gulp = require("gulp");
// const rollup = require("rollup");
// const minify = require("gulp-minify");

// gulp.task("build:js",()=>{
// 	return rollup.rollup({
// 		input: "./src/main.js"
// 	}).then(bundle=>{
// 		return bundle.write({
// 			file: "./dist/thyme.js",
// 			format: "esm",
// 			name: "thyme",
// 			sourcemap: true
// 		});
// 	});
// });

// gulp.task("watch:js",()=>{
// 	gulp.watch("./src/**/*.js", gulp.series("build:js"));
// });

// gulp.task("minify", ()=>{
// 	return gulp.src(["./dist/dill.js"])
// 		.pipe(minify({
// 			ext: {
// 				min: ".min.js"
// 			}
// 		}))
// 		.pipe(gulp.dest("dist"));
// });

// gulp.task("build:js:prod", gulp.series("build:js", "minify"));

// gulp.task("default", gulp.series("build:js"));



const gulp = require("gulp");
const rollup = require("rollup");
const fileService = require("fs");

gulp.task("create-js-from-html",(done)=>{
	const resolveTemplates = (dir) => {
		fileService.readdir(dir,(err,res)=>{
			res.forEach(x=>{
				if (x.includes(".template.html")) {
					fileService.readFile(dir + "/" + x,"utf8",(err,res)=>{
						const newContent = 'export default `' + res + '`';
						fileService.writeFile(dir + "/" + x.replace(".template.html","") + ".template.js",newContent,()=>{});
					});
				}
				else if (fileService.statSync(dir + "/" + x).isDirectory()) {
					resolveTemplates(dir + "/" + x);
				}
			});
		});
	}
	resolveTemplates("./src");
	done();
});

gulp.task("build:js", () => {
    return rollup.rollup({
        input: "./src/main.js"
    }).then(bundle => {
        return bundle.write({
            file: "./dist/thyme.js",
			format: "esm",
			name: "thyme",
            sourcemap: true
        });
    });
});

gulp.task("watch:js",()=>{
    return gulp.watch(["./src/**/*.js","./src/**/*.html","!./src/**/*.template.js"],gulp.series("create-js-from-html","build:js"));
});

gulp.task("default", gulp.series("create-js-from-html","build:js"));
        