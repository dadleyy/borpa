module.exports = function(grunt) {
  
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');

  function getTemplateFiles(srcdir, destdir, wildcard) {
    var path = require('path'),
        files = {};

    grunt.file.expand({cwd: srcdir}, wildcard).forEach(function(relpath) {
      destname = relpath.replace(/\.hbs$/ig,'.js');
      files[path.join(destdir, destname)] = path.join(srcdir, relpath);
    });

    return files;
  };

  grunt.initConfig({

    watch: {
      scripts: {
        files: ['src/js/**/*.js'],
        tasks: ['clean:scripts', 'copy:scripts']
      },
      templates: {
        files: ['src/templates/**/*.hbs'],
        tasks: ['clean:templates', 'handlebars']
      },
      styles: {
        files: ['src/sass/**/*.sass'],
        tasks: ['clean:styles', 'sass']
      }
    },

    clean: {
      scripts: {
        src: ['public/js/app']
      },
      templates: {
        src: ['public/js/templates']
      },
      vendor: {
        src: ['public/js/vendor']
      },
      styles: {
        src: ['public/css']
      }
    },

    copy: {
      vendor: {
        files: [{
          cwd: 'bower_components',
          expand: true,
          src: [
            'requirejs/require.js',
            'jquery/dist/jquery.js',
            'underscore/underscore.js',
            'backbone/backbone.js',
            'handlebars/handlebars.js'
          ],
          dest: 'public/js/vendor'
        }]
      },
      scripts: {
        files: [{
          cwd: 'src/js',
          expand: true, 
          src: ['**'], 
          dest: 'public/js/app'
        }]
      }
    },

    sass: {
      styles: {
        options: {
          loadPath: require('node-neat').includePaths
        },
        files: {
          'public/css/app.css': 'src/sass/app.sass'
        }
      }
    },

    handlebars: {
      build: {
        options: {
          namespace: false,
          amd: true,
          processName: function(file_path) {
            return file_path.replace(/^src\/templates\/(.*)\.hbs$/, '$1');
          }
        },
        files: getTemplateFiles('src/templates', 'public/js/templates/', '**.hbs')
      }
    }

  });

  grunt.registerTask('default', ['clean', 'handlebars', 'copy', 'sass']);

};
