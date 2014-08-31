define([
  "underscore"
],function(_) {

  var users = {
    "admin": "qwerty01",
    "Lorem": "ipsum",
    "boss": "1234",
    "kirilmichaylovich1964": "1964"
  };

  var authorizedCookieName = "authorized";

  var cookie = {
    findAll: function() {
      var cookies = {};
      _(document.cookie.split(";"))
        .chain()
        .map(function(m) {
          return m.replace(/^\s+/, ").replace(/\s+$/, ");
        })
        .each(function(c) {
          var arr = c.split("="),
          key = arr[0],
          value = null;
          var size = _.size(arr);
          if (size > 1) {
            value = arr.slice(1).join("");
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
        return [(key == "name") ? name : key, value].join("=");
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

  // var cookie = new Cookie();

  var isAuthorized = function() {
    return cookie.find(authorizedCookieName) === "true";
  };

  var singIn = function(payload) {
    var match = payload.pass === _.property(payload.userName)(users);
    if (match) cookie.create(authorizedCookieName, "true");
    return match;
  };

  var singOut = function() {
    cookie.destroy(authorizedCookieName);
  };

  return {
    isAuthorized: isAuthorized,
    singIn: singIn,
    singOut: singOut,
    cookie: cookie
  };
});
