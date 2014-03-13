// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params){
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    this.songQueueView = new SongQueueView({collection: this.model.get('songQueue')});

    this.model.on('change:currentSong', function(model){
      this.playerView.setSong(model.get('currentSong'));
      var artist = model.get('currentSong').get('artist');
      var songName = model.get('currentSong').get('title');
      $('.current-song').remove();
      $('audio').before('<div class="current-song"><span style="font-weight:bold">' + artist + '</span>' + ' - ' + songName +'</div>');

    }, this);

    var that = this.model;
    this.playerView.$el.on('ended', function() {
        if (that.get('songQueue').length) {
          console.log('Current song before change');
          console.log(that.get('songQueue').at(0));
          that.get('songQueue').at(0).dequeue();
          that.set('currentSong', that.get('songQueue').at(that.get('songQueue').length-1));
          console.log('Current song after change');
          console.log(that.get('songQueue').at(that.get('songQueue').length-1));
        }
    });
  },

  render: function(){
    return this.$el.html([
      this.playerView.$el,
      this.libraryView.$el,
      this.songQueueView.$el
    ]);
  }

});


// FOR TOMORROW!!!!!!
// 1. Display current song that's playing
// 2. Check that queue and current song are updated correctly after a song finishes playing
// note: we may have put in the wrong indexes in the console logs above
