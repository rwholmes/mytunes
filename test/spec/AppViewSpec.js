describe('AppView', function() {
  var appView, app;

  beforeEach(function () {
    app = new AppModel({library:
      new Songs([
        {
          artist: 'Fakey McFakerson',
          title: 'Never Gonna Mock You Up',
          url: 'https://s3-us-west-1.amazonaws.com/hr-mytunes/data/04+One+In+A+Million.mp3'
        },
        {
          artist: 'BittyBacon',
          title: 'Sizzle Sundays',
          url: 'https://s3-us-west-1.amazonaws.com/hr-mytunes/data/04+One+In+A+Million.mp3'
        }
      ])
    });
    appView = new AppView({model: app});
  });

  it('should generate a PlayerView when created', function(){
    expect(appView.playerView).to.be.an.instanceof(PlayerView);
  });

  describe('when the currently playing song changes', function() {
    it('updates current song in playerView', function(){
      var song = app.get('library').at(0);
      expect(appView.playerView.model).to.not.equal(song);
      song.play();
      expect(appView.playerView.model).to.equal(song);
    });
  });

});
