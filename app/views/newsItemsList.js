define([
  "app",
  "underscore",
  "jquery",
  "backbone",
  "collections/newsItems",
  "views/newsListItem",
  "views/createNewsForm",
  "text!templates/newsItemsList.html",
  "text!data/news.json"
], function(app, _, $, Backbone, NewsItemsCollection, NewsListItemView, CreateNewsFormView, newsItemsListTemplate, stubData) {
  var NewsItemsList = Backbone.View.extend({
    el: ".content-column",
    initialize: function() {
      app.newsCollection = new NewsItemsCollection();
      this.render();
      this.listenTo(this.newsForm, "send", this.addItemToCollection);
    },
    render: function() {
      var compiledTemplate = _.template(newsItemsListTemplate);
      this.$el.append(compiledTemplate);
      this.renderForm();
      this.renderItems();
    },
    renderItems: function() {
      console.log("Render Items");
      this.$el.find(".js-news-list-container").html("");
      var self = this;
      app.newsCollection.fetch();
      if (app.newsCollection.length) {
        app.newsCollection.forEach(function(newsItem) {
          self.renderOneItem(newsItem);
        });
      } else {
        this.$el.find(".js-news-list-container").append("<h4 class\"header\">Sorry, there no one news.</h4>");
      }
    },
    renderForm: function() {
      this.newsForm = new CreateNewsFormView();
    },
    renderOneItem: function(newsItem) {
      newsItem.attributes = this.normalizeItem(newsItem.attributes || newsItem);
      var view = new NewsListItemView({model: newsItem});
      this.$el.find(".js-news-list-container").append(view.render().el);
    },
    addItemToCollection: function(item) {
      item = this.normalizeItem(item);
      app.newsCollection.create(item);
      this.renderItems();
    },
    normalizeItem: function(payload){
      var today = new Date(),
        dd = today.getDate(),
        mm = today.getMonth(),
        yyyy = today.getFullYear();

      if (dd<10) dd='0'+dd;
      if (mm<10) mm='0'+mm;
      today = mm+'/'+dd+'/'+yyyy;

      return {
        title: payload.title,
        userName: payload.userName || app.userName,
        date: today,
        message: payload.message
      };
    }
  });

  return NewsItemsList;
});
