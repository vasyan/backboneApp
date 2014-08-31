define([
  "app",
  "underscore",
  "backbone",
  "views/sidebar",
  "text!templates/layout-main.html"
], function (app, _, Backbone, SidebarView, layoutMainTemplate) {
  "use strict";

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: "#board-app",

    // Compile our stats template
    template: _.template(layoutMainTemplate),

    // Delegated events for creating new items, and clearing completed ones.
    // events: {
    //   'keypress #new-todo':   'createOnEnter',
    //   'click #clear-completed': 'clearCompleted',
    //   'click #toggle-all':    'toggleAllComplete'
    // },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function () {
      // this.allCheckbox = this.$('#toggle-all')[0];
      // this.$input = this.$('#new-todo');
      // this.$footer = this.$('#footer');
      // this.$main = this.$('#main');
      // this.$todoList = this.$('#todo-list');

      // this.listenTo(Todos, 'add', this.addOne);
      // this.listenTo(Todos, 'reset', this.addAll);
      // this.listenTo(Todos, 'change:completed', this.filterOne);
      // this.listenTo(Todos, 'filter', this.filterAll);
      // this.listenTo(Todos, 'all', this.render);

      // MessagesCollection.fetch({reset:true});
      this.renderLayout();
      this.renderSidebar();
      this.renderContentSide();
    },

    renderLayout: function () {
      this.$el.html(this.template);
    },

    renderSidebar: function() {
      new SidebarView();
    },

    renderContentSide: function() {
      var viewName = (app.isAuthorized) ? "newsItemsList" : "welcome";
      require(["views/" + viewName], function(ContentView) {
        new ContentView();
      });
    }

  });

  return AppView;
});
