// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params){
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    this.songQueueView = new SongQueueView({collection: this.model.get('songQueue')});

    this.model.on('change:currentSong', function(model){
      this.playerView.setSong(model.get('currentSong'));
    }, this);

    var that = this.model;
    this.playerView.$el.on('ended', function() {
        console.log('song ended');
        console.log(that);
        console.log(that.get('songQueue'));
        console.log(that.get('songQueue').at(0));
        that.get('songQueue').at(0).dequeue();
        console.log(that.get('songQueue'));
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
