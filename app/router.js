define([
  'jquery',
  'underscore',
  'backbone',
  'views/appView',
  'views/newsItemsList'
], function($, _, Backbone, AppView, newsItemsList, UserListView) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      "": "showIndexPage",
      "news": "showNewsFeed"
    },

    // handlers
    "showIndexPage": function() {
      console.log("Welcome to Index!");
    },
    "showNewsFeed": function() {
      console.log("Welcome to NewsFeed!");
    }
  });

  return AppRouter;
});
