config.init({
  meta : {
    banner : '/* Wavestreaming.com - https://github.com/Wavestreaming/jquery-shoutcast - MIT licensed */'
  },
  lint: {
    files: ['jquery.shoutcast.js','easySetup.js']
  },
  min: {
    'jquery.shoutcast.min.js': ['<banner>','jquery.shoutcast.js'],
    'jquery.shoutcast.easy.min.js' : ['<banner>','jquery.shoutcast.js','easySetup.js']
  },
  watch: {
    files: '<config:lint.files>',
    tasks: 'lint min'
  },
  jshint: {
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
      jquery: true,
    }
  }
});
task.registerTask('default', 'lint min');