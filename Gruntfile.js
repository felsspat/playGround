module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: true, yuicompress: true, optimization: 2
                },
                files: {
                    "css/style.css" : "less/style.less"
                }
            }
        }, uglify: {
            my_target: {
                files: {
                    'js/main.min.js': ['node_modules/jquery/dist/jquery.js', 'jsSource/main.js']
                }
            }
        }, jshint: {
            files: ['Gruntfile.js', 'jsSource/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        }, watch: {
            styles: {
                files: ['less/**/*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }
        /*
         webfont: { // Erstellt im Buildprozess eine Schriftart aus SVG-Dateien
         icons: {
         src: '../../temp/*.svg',
         dest: '../../' + grunt.option('dest'),
         options: {
         fontFilename: 'icons',
         stylesheet: 'less',
         htmlDemo: 'true',
         relativeFontPath: '/'+grunt.option('dest'),
         template: 'grunt-webfont-template.css'
         }
         }
         }, svgstore: { // SVG Sprite erstellen. Wird bisher wenn überhaupt nur manuell ausgeführt
         default: {
         files: {
         'dest/dest.svg': ['../../temp/*.svg'],
         },
         },
         options: {
         includedemo: true,
         inheritviewbox: true,
         svg: {
         xmlns: 'http://www.w3.org/2000/svg'
         }
         }
         }*/
    });

    //grunt.loadNpmTasks('grunt-webfont');
    //grunt.loadNpmTasks('grunt-svgstore');
    //grunt.registerTask('svgsprite', ['svgstore']);
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['less', 'jshint', 'uglify']);
};
