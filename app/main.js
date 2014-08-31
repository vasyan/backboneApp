require([
  "app",
  "router",
  "utils",
  "./views/appView"
  ], function(app, Router, utils, Layout) {

    utils.loadCss(app.cssUrl);
    app.router = new Router();

    Backbone.history.start({ pushState: true, root: app.root });
  }
);
