module.exports = function(grunt){

	grunt.initConfig({
		pkg:grunt.file.readJSON("package.json"),
		concat:{
			options:{
				stripBanners:true,
				banner:"/*!<%= pkg.name %>-<%=pkg.version%>-"+"<%=grunt.template.today('yyyy-mm-dd')%>*/"	
			},
			cssConcats:{
				src:["src/css/style1.css","src/css/style2.css"],
				dest:'src/css/concat/<%=pkg.name%>-<%=pkg.version%>.css'	
			},
			jsConcats:{
				src:"src/js/*.js",
				/*src:["src/js/style1.js","src/js/style2.js"],*/
				dest:'src/js/concat/<%=pkg.name%>-<%=pkg.version%>.js'		
			}
		},
		cssmin:{
			options:{
				stripBanners:true,
				banner:"/*!<%= pkg.name %>-<%=pkg.version%>-"+"<%=grunt.template.today('yyyy-mm-dd')%>*/"	
			},
			tobuild:{
				src:"src/css/concat/<%=pkg.name%>-<%=pkg.version%>.css",
				dest:'dist/css/<%=pkg.name%>-<%=pkg.version%>.min.css'
			}
		}, 
		uglify:{
			options:{
				stripBanners:true,
				banner:"/*!<%= pkg.name %>-<%=pkg.version%>-"+"<%=grunt.template.today('yyyy-mm-dd')%>*/"	
			},
			tobuilds:{
				src:"src/js/concat/<%=pkg.name%>-<%=pkg.version%>.js",
				dest:'dist/js/<%=pkg.name%>-<%=pkg.version%>.min.js'
			}
		},

		csslint: {
	      options: {
	        csslintrc: '.csslintrc'
	      },
	      dist: ["src/css/*.css"]
		},

		jshint: {
	      options: {
	        jshintrc: '.jshintrc'
	      },
	      dist: ["src/js/*.js"]
		 },
		//压缩HTML
     	htmlmin: {
	       options: {
	         removeComments: true,
	         removeCommentsFromCDATA: true,
	         collapseWhitespace: true,
	         collapseBooleanAttributes: true,
	         removeAttributeQuotes: true,
	         removeRedundantAttributes: true,
	         useShortDoctype: true,
	         removeEmptyAttributes: true,
	         removeOptionalTags: true
	       },
	       html: {
	         files: [
	           {expand: true, cwd: 'src/', src: ['**/*.html'], dest: 'demo/html'},
	           //{expand: true, src: ['src/**/*.html'], dest: 'demo/html'}
	         ]
	       }
	     },
		copy: {
		  main: {
		    files: [
		      // src子文件拷贝到demo目录下,并且只是文件
		      //{expand: true, src: ['src/*'], dest: 'demo/', filter: 'isFile'},
		 
		      //  src所有子文件和文件夹拷贝到demo目录下
		      //{expand: true, src: ['src/**'], dest: 'demo/'},
		 
		      // src所有子文件和文件夹拷贝到demo目录下 不包含src当前自己
		      {expand: true, cwd: 'src/', src: ['**'], dest: 'demo/'},
		 
		      // 把src下面所有的子文件不包括目录全部拷贝出来，放入到demo目录下
		      //{expand: true, flatten: true, src: ['src/**'], dest: 'demo/', filter: 'isFile'},
		    ],
		  },
		},
		compress: {
		  main: {
		    options: {
		      archive: 'archive.zip'
		    },
		    files: [
		      {src: ['src/*'], dest: 'demo/', filter: 'isFile'}, // includes files in path 
		      {src: ['src/**'], dest: 'demo/'}, // includes files in path and its subdirs 
		      {expand: true, cwd: 'src/', src: ['**'], dest: ''}, // makes all src relative to cwd 
		      {flatten: true, src: ['src/**'], dest: '/', filter: 'isFile'} // flattens results to a single level 
		    ]
		  }
		},
		watch:{
			build:{
				files:["src/js/*.js","src/css/*.css","src/*.html"],
				//tasks:["jshint","csslint","concat","cssmin","uglify","copy","htmlmin"],
				tasks:["jshint","csslint","concat","cssmin","uglify","htmlmin"],
				options:{spawn:false}
			}
		}


	});


	//告诉grunt我们将使用的插件
	grunt.loadNpmTasks("grunt-contrib-concat");//文件合并
	grunt.loadNpmTasks("grunt-contrib-cssmin");//css压缩
	grunt.loadNpmTasks("grunt-contrib-uglify");//js自动混淆
	grunt.loadNpmTasks("grunt-contrib-jshint");//js检测
	grunt.loadNpmTasks("grunt-contrib-csslint");//css检测
	grunt.loadNpmTasks('grunt-contrib-htmlmin');//html压缩
	//grunt.loadNpmTasks('grunt-contrib-copy');//文件复制
	grunt.loadNpmTasks("grunt-contrib-watch");//监听变化--神器
	grunt.loadNpmTasks('grunt-contrib-compress');//打包zip
	



	//告诉grunt当我们输入终端输入grunt时，需要做些什么
	//grunt.registerTask("default",["jshint","csslint","concat","cssmin","uglify","htmlmin","compress","copy","watch"]);
	grunt.registerTask("default",["jshint","csslint","concat","cssmin","uglify","htmlmin","compress","watch"]);



};