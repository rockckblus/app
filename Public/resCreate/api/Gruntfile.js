module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        /**
         * 自动化
         * 16/1/22 */
        watch: {
            build: {
                files: ['Gruntfile.js', 'routes/*.js' ],
                tasks: ['express'],
                options: {
                    spawn: false
                }
            }
        },

        /** express  从其  */
        express: {
            options: {
                port: 3008,
                hostname: '*'
            },
            load: {
                server: "./bin/www",
                livereload: true,
                serverreload: true
            }
        }
    });



    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.registerTask('default', ['watch']);
};