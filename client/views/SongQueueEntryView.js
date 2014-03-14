// SongQueueEntryView.js - Defines a backbone view class for the song queue entries.
var SongQueueEntryView = Backbone.View.extend({
  // your code here!
  tagName: 'tr',

  template: _.template('<td class="queueSong">(<%= artist %>)</td><td class="queueSong"><%= title %></td><td class="removeFromQueue"><a href="#">Remove</a></td>'),

  events: {
    'click .queuedSong': function() {
      this.model.play();
    },
    'click a': function() {
      this.model.dequeue();
    }
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }
});
