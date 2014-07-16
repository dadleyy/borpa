define(['backbone', 'templates/Viewport'], function(backbone, ViewportTemplate) {

  var Viewport = backbone.View.extend({

    render: function() {
      var viewport_html = ViewportTemplate();
      this.$el.html(viewport_html);
    }

  });

  return Viewport;

});
