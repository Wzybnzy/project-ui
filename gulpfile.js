var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');


gulp.task('sass',function(){
	return gulp.src('./src/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./src/css'));
});

gulp.task('watch',function(){
	gulp.watch('./src/scss/*.scss',gulp.series('sass'))
});


gulp.task('server',function(){
	return gulp.src('./src')
	.pipe(server({
		port:8680,
		proxies:[{
			source:'/classify/iconlist',
			target:'http://localhost:3000/classify/classify/iconlist'
		},
		{
			source:'/users/adduser',
			target:'http://localhost:3000/users/users/adduser'
		},{
			source:'/classify/addClassify',
			target:'http://localhost:3000/classify/classify/addClassify'
		},{
			source:'/classify/getClassify',
			target:'http://localhost:3000/classify/classify/getClassify'
		},{
			source:'/bill/getBill',
			target:'http://localhost:3000/bill/bill/getBill'
		},{
			source:'/bill/addBill',
			target:'http://localhost:3000/bill/bill/addBill'
		}]
	}));
});

gulp.task('dev',gulp.series('sass','server','watch'));