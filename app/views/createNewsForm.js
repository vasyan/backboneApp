define([
  "underscore",
  "jquery",
  "backbone",
  "utils",
  "text!templates/createNewsForm.html"
], function(_, $, Backbone, utils, formTemplate) {
  var CreateNewFormView = Backbone.View.extend({
    el: ".js-form-container",
    events: {
      "click .js-send": "sendMessage",
      "click .js-clear": "clearInputs",
      "focus input, textarea": "checkInput",
      "keypress textarea": "sendByEnter"
    },
    template: _.template(formTemplate),
    initialize: function() {
      this.render();
      this.inputs = {
        title: this.$el.find(".js-title-input"),
        message: this.$el.find(".js-message-input")
      };
      this.$formContainer = this.$el.find(".form");
    },
    render: function() {
      this.$el.append(this.template);
    },
    sendMessage: function() {
      var formValues = {
        title: this.inputs.title.val(),
        message: this.inputs.message.val()
      };
      this.flushErrors();
      var isValide = utils.inputs.validateInputs(this.$formContainer);

      if (isValide) {
        this.trigger("send", formValues);
        _.forEach(this.inputs, function(input) {
          input.val("");
        }, this);
      }
    },
    sendByEnter: function(event) {
      var ENTER_KEY = 10;
      if (event.ctrlKey && event.which === ENTER_KEY) {
        this.sendMessage();
      }
    },
    flushErrors: function() {
      _.forEach(this.inputs, function(input) {
        input.closest(".field").toggleClass("error", false);
      });
      this.$formContainer.toggleClass("warning", false)
        .toggleClass("validation-error-title", false)
        .toggleClass("validation-error-message", false);
    },
    clearInputs: function(input) {
      var flushField = function(elem) {
        return elem.val("").closest(".field").toggleClass("error", false);
      };
      if (!input.eventPhase) {
        flushField(input);
      } else {
        _.forEach(this.inputs, function(input) {
          flushField(input);
        });
      }
    },
    checkInput: function(event) {
      var elem = $(event.target);
      if (elem.closest(".field").hasClass("error")) {
        this.clearInputs(elem);
      }
    }
  });

  return CreateNewFormView;
});
