// Kick off the application.
require([
  "app",
  "router",
  "utils",
  "./views/appView"
  ], function(app, Router, utils, Layout) {
    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    app.userName = utils.cookie.find("userName");
    app.isAuthorized = utils.isAuthorized();
    app.layoutView = new Layout();

    app.router = new Router();
    // Trigger the initial route and enable HTML5 History API support, set the
    // root folder to '/' by default.  Change in app.js.
    Backbone.history.start({ pushState: true, root: app.root });
  }
);
