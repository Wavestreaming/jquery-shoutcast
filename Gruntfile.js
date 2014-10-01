module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        jshint: {
            files: ['jquery.shoutcast.js', 'easySetup.js'],
            options: {
                expr: true,
                browser: true,
                devel: true,
                strict: true,
                undef: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                latedef: true,
                noarg: true,
                noempty: true,
                regexp: false,
                jquery: true
            }
        },
        uglify: {
            options: {banner: "/* Wavestreaming.com - https://github.com/Wavestreaming/jquery-shoutcast - MIT licensed */\n"},
            target: {
                files: {
                    'jquery.shoutcast.min.js': 'jquery.shoutcast.js',
                    'jquery.shoutcast.easy.min.js': ['jquery.shoutcast.js', 'easySetup.js']
                }
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'uglify'])

};