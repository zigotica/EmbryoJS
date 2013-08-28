module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        // PACKAGE INFO
        pkg: grunt.file.readJSON('package.json'),
        
        // FOLDERS
        SOURCE : 'src',
        BUILDS : 'lib',
        TESTS  : 'test',

        // TASKS
        jshint: {
            files: ['gruntfile.js', '<%= SOURCE %>/embryo.js', '<%= TESTS %>/embryo.*.js'],
            options: {
                laxcomma: true,
                proto: true,
                boss: true
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['<%= SOURCE %>/embryo.js'],
                dest: '<%= BUILDS %>/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! \n<%= pkg.name %> <%= pkg.version %>, <%= pkg.author %>\n<%= pkg.homepage %>\n*/\n',
                compress:  true
            },
            dist: {
                files: {
                    '<%= BUILDS %>/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        connect: {
            uses_defaults: {}
        },
        watch: {
            dev: {
                files: ['<%= TESTS %>/embryo.test.html', '<%= jshint.files %>'],
                tasks: ['jshint', 'concat', 'uglify'],
                options: {
                    livereload: true,
                    interrupt: true,
                    nospawn: true
                }
            }
        }
    });

    // LOAD MODULES
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // REGISTER TASKS
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('live', ['connect', 'watch']);
    
    // write file actions to terminal
    grunt.event.on('watch', function(action, filepath, target) {
      grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

};