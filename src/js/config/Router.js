define(['backbone'], function(backbone) {

  var Router = backbone.Router.extend({ 
  
    routes: {
      '': 'index'
    },

    initialize: function(viewport) {
      Backbone.history.start({
        pushState: true, 
        root: "/"
      });
      viewport.render();
    },

    index: function() {
    }

  });

  return Router;

});
