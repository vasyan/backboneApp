define([
  "app",
  "underscore",
  "backbone",
  "utils",
  "collections/newsItems",
  "views/newsListItem",
  "views/createNewsForm",
  "text!templates/newsItemsList.html"
], function(app, _, Backbone, utils, NewsItemsCollection, NewsListItemView, CreateNewsFormView, newsItemsListTemplate) {
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
      var regxp = /<\/?[^>]+(>|$)/g,
        formattedToday = utils.getFormattedDate();

      return {
        title: payload.title.replace(regxp, ""),
        userName: payload.userName || app.userId,
        timestamp: new Date().getTime(),
        date: formattedToday,
        message: payload.message.replace(regxp, "")
      };
    }
  });

  return NewsItemsList;
});
