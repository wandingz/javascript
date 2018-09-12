module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                undef: true,
                devel: true,
                browser: true,
                esversion: 6,
                globals: {
                    jQuery: true,
                },
            },
            build: ['files/dev/js/*.js']
        },
        uglify: {
            build: {
                files: {'files/prod/js/app.main.js': 'files/dev/js/*.js'}
            }
        },
        cssmin: {
            target: {
                files: {'files/prod/js/app.main.css': 'files/dev/js/*.css'}
            }
        },
        watch: {
            css: {
                files: ['files/dev/css/*.css'],
                tasks: ['cssmin']
            },
            js: {
                files: ['files/dev/js/*.js'],
                tasks: ['jshint', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.task.registerTask('default', ['watch']);
}