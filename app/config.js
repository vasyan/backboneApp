require.config({
  // baseUrl: "/modules",
  // packages: ["modules/message"],
  paths: {
    "underscore": "../bower_components/lodash/dist/lodash.underscore",
    "lodash": "../bower_components/lodash/dist/lodash",
    "template": "../bower_components/lodash-template-loader/loader",
    "jquery": "../bower_components/jquery/dist/jquery",
    "backbone": "../bower_components/backbone/backbone",
    "localStorage": "../bower_components/backbone.localStorage/backbone.localStorage-min"
  },

  deps: ["main"]
});
