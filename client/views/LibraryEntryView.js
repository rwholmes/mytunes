// LibraryEntryView.js - Defines a backbone view class for the entries that will appear within the library views. These will be inserted using the "subview" pattern.
var LibraryEntryView = Backbone.View.extend({

  tagName: 'tr',

  template: _.template('<td class="libSong">(<%= artist %>)</td><td class="libSong"><%= title %></td><td class="addToQueue"><a href="#">Add</a></td><td class="playCount">Playcount: <%= playcount %></td>'),

  events: {
    'click .libSong': function() {
      this.model.play();
    },
    'click .addToQueue': function() {
      this.model.enqueue();
    }
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }

});
