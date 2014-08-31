define([
  "app",
  "lodash",
  "jquery"
],function(app, _, $) {
  var users = {
    "admin": "qwerty01",
    "Lorem": "ipsum",
    "boss": "1234",
    "kirilmichaylovich1964": "1964"
  };
  var authorizedCookieName = "authorized";
  var userIdCookie = "userId";

  var cookie = {
    findAll: function() {
      var cookies = {};
      _(document.cookie.split(';'))
      .chain()
      .map(function(m) {
        return m.replace(/^\s+/, '').replace(/\s+$/, '');
      })
      .each(function(c) {
        var arr = c.split('='),
        key = arr[0],
        value = null;
        var size = _.size(arr);
        if (size > 1) {
          value = arr.slice(1).join('');
        }
        cookies[key] = value;
      });
      return cookies;
    },
    find: function(name) {
      var cookie = null,
      list = this.findAll();

      _.each(list, function(value, key) {
        if (key === name) cookie = unescape(value);
      });
      return cookie;
    },
    create: function(name, value, time) {
      var today = new Date(),
      offset = (typeof time == "undefined") ? (1000 * 60 * 60 * 24) : (time * 1000),
      expires_at = new Date(today.getTime() + offset);

      var cookie = _.map({
        name: escape(value),
        expires: expires_at.toGMTString(),
        path: "/"
      }, function(value, key) {
        return [(key === "name") ? name : key, value].join("=");
      }).join(";");

      document.cookie = cookie;
      return this;
    },
    destroy: function(name, cookie) {
      if (cookie = this.find(name)) {
        this.create(name, null, -1000000);
      }
      return this;
    }
  };

  var loadCss = function(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
  };

  var isAuthorized = function() {
    return cookie.find(authorizedCookieName) === "true";
  };

  var signIn = function(payload) {
    var match = payload.passwd === _.property(payload.login)(users); //must investigate _.property issue
    if (match) {
      cookie.create(authorizedCookieName, "true");
      cookie.create(userIdCookie, payload.login);
      app.isAuthorized = true;
    }
    return match;
  };

  var signOut = function() {
    cookie.destroy(authorizedCookieName);
    cookie.destroy(userIdCookie);
  };

  var inputs = {
    validateInputs: function(formContainer, uniqueClassNames) {
      var errors = [];
      this.inputs = $(".field", formContainer);
      this.formContainer = formContainer;
      this.uniqueClassNames = uniqueClassNames || "warning";
      _.forEach(this.inputs, function(input) {
        if ($(input).find(".js-input").val() === "") errors.push(input);
      });

      if (!_.isEmpty(errors)) this.handleValidationErrors(errors, uniqueClassNames);
      return _.isEmpty(errors);
    },
    handleValidationErrors: function(errors) {
      this.formContainer.toggleClass(this.uniqueClassNames, true);
      _.forEach(errors, function(error) {
        this.formContainer.toggleClass("validation-error-" + error.dataset.field, true);
        $(error).toggleClass("error", true);
      }, this);
    },
    flushErrors: function() {
      _.forEach(this.inputs, function(input) {
        input.toggleClass("error", false);
      });
      this.formContainer.toggleClass(this.uniqueClassNames, false);
    }
  };

  var getFormattedDate = function(date) {
    date = date || new Date();
    var dd = date.getDate(),
      mm = date.getMonth() + 1,
      yyyy = date.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return [dd, mm, yyyy].join(".");
  }

  return {
    loadCss: loadCss,
    getFormattedDate: getFormattedDate,
    isAuthorized: isAuthorized,
    signIn: signIn,
    signOut: signOut,
    cookie: cookie,
    inputs: inputs
  };
});
