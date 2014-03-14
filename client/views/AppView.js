// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params){
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    this.songQueueView = new SongQueueView({collection: this.model.get('songQueue')});

    this.model.on('change:currentSong', function(model){
      this.playerView.setSong(model.get('currentSong'));
      if (model.get('currentSong')) {
        var artist = model.get('currentSong').get('artist');
        var songName = model.get('currentSong').get('title');
        $('.current-song').remove();
        $('audio').before('<div class="current-song"><span style="font-weight:bold">' + artist + '</span>' + ' - ' + songName +'</div>');
      }
    }, this);

    var that = this.model;
    this.playerView.$el.on('ended', function() {
        if (that.get('songQueue').length) {
          that.get('songQueue').at(0).dequeue();
          that.set('currentSong', that.get('songQueue').at(0));
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


