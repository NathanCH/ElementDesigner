module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                files: {
                    'build/js/app.js' : [
                        'vendor/CSSUtilities.js',
                        'vendor/Selector.js',
                        'js/helper.js',
                        'js/config.js',
                        'js/template.js',
                        'js/view.js',
                        'js/controller.js',
                        'js/app.js'
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default' , ['concat', 'uglify']);
}