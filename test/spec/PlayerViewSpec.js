describe('PlayerView', function() {
  var library, appView;

  beforeEach(function() {

    library = new Songs([
      {
        url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/04+One+In+A+Million.mp3",
        title: "4 Page Letter",
        artist: "Aaliyah"
      },
      {
        url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/05+Hot+Like+Fire.mp3",
        title: "We Need A Resolution",
        artist: "Aaliyah"
      }
    ]);
    // playerView is created in AppView initialize
    // access with appView.playerView
    appView = new AppView({model: new AppModel({library: library})});
  });

  it('gets its model property set to any song that is played', function(){
    expect(appView.playerView.model).to.not.equal(library.at(0));
    library.at(0).play();
    expect(appView.playerView.model).to.equal(library.at(0));
  });

  describe('Song transitions', function() {
    it('dequeues a song when finished playing & plays the next song', function(){
      library.at(0).play();
      var originalSong = appView.playerView.model;
      appView.model.get('songQueue').add(library.at(1));
      // Simulate a song end event being triggered
      $(appView.playerView.el).trigger('ended');
      expect(appView.playerView.model).to.not.equal(originalSong);
    });
  });

});
