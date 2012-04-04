config.init({
  meta : {
    banner : '/* Wavestreaming.com - https://github.com/Wavestreaming/jquery-shoutcast - MIT licensed */'
  },
  lint: {
    files: ['jquery.shoutcast.js']
  },
  min: {
    'jquery.shoutcast.min.js': ['<banner>','jquery.shoutcast.js']
  },
  watch: {
    files: ['jquery.shoutcast.js'],
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
      regexp: true,
      jquery: true,
    }
  }
});
task.registerTask('default', 'lint min');