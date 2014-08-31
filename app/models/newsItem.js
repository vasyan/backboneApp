define([
  "backbone"
], function(Backbone) {
  var Message = Backbone.Model.extend({
    defaults: {
      username: "{{Username}}",
      date: "{{Date}}",
      title: "{{Title}}",
      message: "{{MessageBody}}"
    }
  });
  return Message;
});
