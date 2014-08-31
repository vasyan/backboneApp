define([
  "app",
  "underscore",
  "backbone",
  "views/signInForm",
  "text!templates/sidebarMenu.html"
], function(app, _, Backbone, SignInForm, sidebarMenuTemplate) {
  var SidebarMenu = Backbone.View.extend({
    el: ".sidebar-menu nav",
    events: {
      "click .js-sign-out": "handleSignOut"
    },
    template: _.template(sidebarMenuTemplate),
    initialize: function() {
      if (app.isAuthorized) {
        this.showLoginMenu();
      } else {
        app.signInForm = new SignInForm();
      }
    },
    showLoginMenu: function() {
      this.$el.append(this.template);
    },
    handleSignOut: function() {
      app.router.navigate("/signout", {trigger: true, replace: true});
    }
  });

  return SidebarMenu;
});
