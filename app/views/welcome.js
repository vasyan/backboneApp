define([
  "underscore",
  "backbone",
  "text!templates/welcome.html"
], function(_, Backcone, welcomeTemplate) {
  var Welcome = Backbone.View.extend({
    el: ".content-column",
    template: _.template(welcomeTemplate),
    initialize: function() {
      this.render();
    },
    render: function() {
      this.$el.html(this.template);
    }
  });

  return Welcome;
});
