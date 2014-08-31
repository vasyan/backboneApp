define([
  "underscore",
  "backbone",
  "text!templates/newsListItem.html"
], function(_, Backbone, newsListItemTemplate) {
  var NewsListItem = Backbone.View.extend({
    tag: "div",
    className: "event",
    template: _.template(newsListItemTemplate),
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.attributes));
      this.$input = this.$(".edit");
      return this;
    }
  });

  return NewsListItem;
});
