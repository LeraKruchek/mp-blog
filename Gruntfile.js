/**
 * Created by Valeryia_Kruchak on 09-Feb-15.
 */
// Gruntfile.js
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-include-source');

    grunt.initConfig({
        includeSource: {
          options: {
              basePath: '',
              templates: {
                  html: {
                      js: '<script src="/{filePath}"></script>'
                  }
              }
          },
          myTarget: {
              files: {
                 'public/views/index.html':  'public/views/index.tpl.html'
              }
          }
        },



        jshint: {
            all: ['public/src/js/**/*.js']
        },

        uglify: {
            build: {
                files: {
                    'public/dist/js/app.min.js': ['public/src/js/**/*.js', 'public/src/js/*.js']
                }
            }
        },
        less: {
            build: {
                files: {
                    'public/dist/css/style.css': 'public/src/css/style.less'
                }
            }
        },
        cssmin: {
            build: {
                files: {
                    'public/dist/css/style.min.css': 'public/dist/css/style.css'
                }
            }
        },

        watch: {
            css: {
                files: ['public/src/css/**/*.less'],
                tasks: ['less', 'cssmin']
            },
            js: {
                files: ['public/src/js/**/*.js'],
                tasks: ['jshint', 'uglify']
            }
        },


        nodemon: {
            dev: {
                script: 'server.js'
            }
        },


        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        }

    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['includeSource:myTarget', 'less', 'cssmin', 'jshint', 'uglify', 'concurrent']);

};