define([
  "app",
  "backbone",
  "utils",
  "views/appView",
], function(app, Backbone, utils, AppView) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      "": "showIndexPage",
      "signout": "handleSignOut"
    },

    // handlers
    "handleSignOut": function() {
      utils.signOut();
      this.navigate("", {trigger: true});
    },
    "showIndexPage": function() {
      app.appView = new AppView();
    }
  });

  return AppRouter;
});
