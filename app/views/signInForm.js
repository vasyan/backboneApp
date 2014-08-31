define([
  "app",
  "underscore",
  "jquery",
  "backbone",
  "text!templates/signInForm.html"
], function(app, _, $, Backbone, signInFormTemplate) {
  var SignInForm = Backbone.View.extend({
    el: ".sidebar-menu nav",
    events: {
      "click .js-sign-in": "signInProcess"
    },
    template: _.template(signInFormTemplate),
    initialize: function() {
      this.inputs = {
        login: this.$el.find(".js-login-input-container"),
        passwd: this.$el.find(".js-passwd-input-container")
      };
      this.render();
    },
    render: function() {
      this.$el.html(this.template);
    },
    signInProcess: function() {

    },
    validateInputs: function() {

    }
  });

  return SignInForm;
});
