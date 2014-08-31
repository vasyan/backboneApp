define([
  "backbone",
  "localStorage",
  "models/newsItem"
], function(Backbone, LocalStorage, newsItemModel) {
  var MessagesList = Backbone.Collection.extend({
    model: newsItemModel,
    localStorage: new LocalStorage("NewsStorage"),
    url: "app/data/news.json",
    comparator: function(newsItem) {
      return -newsItem.get("timestamp");
    },
    refreshFromServer: function() {
      return Backbone.ajaxSync("read", this);
    }
  });

  return MessagesList;
});
