define([
  "backbone"
], function(Backbone) {
  var Message = Backbone.Model.extend({
    defaults: {
      userName: "{{Username}}",
      date: "{{Date}}",
      title: "{{Title}}",
      message: "{{MessageBody}}"
    }
  });
  return Message;
});
