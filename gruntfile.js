module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                files: {
                    'build/js/app.js' : [
                        'vendor/CSSUtilities.js',
                        'js/helper.js',
                        'js/config.js',
                        'js/template.js',
                        'js/view.js',
                        'js/controller.js',
                        'js/app.js'
                    ]
                }
            },
            css: {
                files: {
                    'build/css/main.css' : [
                        'css/reset.css',
                        'css/element-designer.css'
                    ]
                }
            }
        },
        uglify: {
            min: {
                files: {
                    'build/js/app.min.js' : ['build/js/app.js']
                }
            }
        },
        cssmin: {
            main: {
                src: 'build/css/main.css',
                dest: 'build/css/main.min.css',
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default' , ['concat', 'uglify', 'cssmin']);
}