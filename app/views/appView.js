define([
  "app",
  "underscore",
  "backbone",
  "utils",
  "views/sidebar",
  "text!templates/layout-main.html"
], function (app, _, Backbone, utils, SidebarView, layoutMainTemplate) {
  var AppView = Backbone.View.extend({
    el: "#board-app",
    template: _.template(layoutMainTemplate),
    initialize: function () {
      app.isAuthorized = utils.isAuthorized();
      this.renderComponents();
      if(app.signInForm) this.listenTo(app.signInForm, "sign-in-success", this.renderComponents);
    },
    renderComponents: function() {
      app.userId = utils.cookie.find("userId");
      this.renderLayout();
      this.renderSidebar();
      this.renderContentSide();
    },
    renderLayout: function () {
      this.$el.html(this.template);
    },
    renderSidebar: function() {
      this.sidebar = new SidebarView();
    },
    renderContentSide: function() {
      var self = this;
      var viewName = (app.isAuthorized) ? "newsItemsList" : "welcome";
      require(["views/" + viewName], function(ContentView) {
        self.content = new ContentView();
      });
    }
  });

  return AppView;
});
