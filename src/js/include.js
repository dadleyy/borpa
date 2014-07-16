(function() {

requirejs.config({
  baseUrl: '/js',
  paths: {
    'jquery': 'vendor/jquery/dist/jquery',
    'backbone': 'vendor/backbone/backbone',
    'underscore': 'vendor/underscore/underscore',
    'handlebars': 'vendor/handlebars/handlebars'
  },
  shim: {
    'handlebars': {
      exports: 'Handlebars'
    }
  }
});

require(['app/config/Router', 'app/views/Viewport'], function(Router, Viewport) {
  var $viewport_el = $("#viewport"),
      viewport = new Viewport({el: $viewport_el}),
      router = new Router(viewport);
});

})();
