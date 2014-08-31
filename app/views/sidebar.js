define([
  "app",
  "underscore",
  "jquery",
  "backbone",
  "views/signInForm",
  "text!templates/sidebarMenu.html"
], function(app, _, $, Backbone, SignInForm, sidebarMenuTemplate) {
  var SidebarMenu = Backbone.View.extend({
    el: ".sidebar-menu nav",
    template: _.template(sidebarMenuTemplate),
    initialize: function() {
      if (app.isAuthorized) {
        this.showLoginMenu();
      } else {
        new SignInForm();
      }
    },
    showLoginMenu: function() {
      this.$el.append(this.template);
    }
    // showSignInForm: function() {
    //   var self = this;
    //   require(["text!templates/signInForm.html"], function(template) {
    //     self.$el.html(_.template(template));
    //   });
    // }
  });

  return SidebarMenu;
});
