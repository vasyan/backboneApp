define([
  "app",
  "underscore",
  "backbone",
  "utils",
  "text!templates/signInForm.html"
], function(app, _, Backbone, utils, signInFormTemplate) {
  var SignInForm = Backbone.View.extend({
    el: ".sidebar-menu nav",
    events: {
      "click .js-sign-in": "signInProcess",
      "focus input": "checkInput",
      "keypress input": "signInByEnter"
    },
    template: _.template(signInFormTemplate),
    initialize: function() {
      this.render();
      this.$formContainer = this.$el.find(".js-form-container");
      this.inputs = {
        login: this.$el.find(".js-login-input-container"),
        passwd: this.$el.find(".js-passwd-input-container")
      };
    },
    render: function() {
      this.$el.html(this.template);
    },
    signInByEnter: function(event) {
      var ENTER_KEY = 13;
      if (event.which === ENTER_KEY) {
        this.signInProcess();
      }
    },
    signInProcess: function() {
      var self = this;
      var formValues = {
        login: this.inputs.login.find("input").val(),
        passwd: this.inputs.passwd.find("input").val()
      };
      this.flushErrors();
      var isValide = utils.inputs.validateInputs(this.$formContainer);
      if (isValide) {
        if (utils.signIn(formValues)) {
          this.trigger("sign-in-success");
        } else {
          this.handeSignInError();
        }
      }
    },
    handeSignInError: function() {
      this.$formContainer.toggleClass("sign-in-error", true);
    },
    flushErrors: function() {
      _.forEach(this.inputs, function(input) {
        input.closest(".input").toggleClass("error", false);
      });
      this.$formContainer.toggleClass("sign-in-error", false);
    }
  });

  return SignInForm;
});
