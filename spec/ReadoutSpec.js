describe('Readout', function () {
  var Readout = require('../src/Readout');

  beforeEach(function() {
    readout = new Readout()
  });

  describe('#opening message', function () {
    it('opening message to player', function () {
      expect(readout.readoutArray).toEqual(['You wake up in a dark dungeon. Your eyes slowly adjust, and you see a dagger next to you. You think think its a good idea to pick this up.<br>', 'Suddenly, you hear what looks like a zombie running towards you...<br>'])
    });
  });
  describe('#clearReadout', function () {
    it('clears the readout', function () {
      readout.clearReadout()
      expect(readout.readoutArray).toEqual([])
    });
  });
  describe('#addReadout', function () {
    it('returns what it is passed', function () {
      readout.clearReadout()
      readout.addReadout('test message')
      readout.addReadout('test message')
      expect(readout.readoutArray).toEqual(['test message<br>', 'test message<br>'])
    });
  });
  describe('#printReadout', function () {
    it('prints to readout', function () {
      readout.clearReadout()
      readout.addReadout('test message')
      expect(readout.printReadout()).toEqual(['test message<br>'])
    });
  });
});