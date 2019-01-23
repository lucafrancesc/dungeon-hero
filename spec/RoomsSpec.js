describe('Rooms',function(){

  var Rooms = require('../src/Rooms');
  var room
  var monsters
  var combat
  var player

  beforeEach(function() {
    function MonstersStub() {}
    MonstersStub.prototype = {
      returnMonster() {}
    };
    function PlayerStub() {}
    PlayerStub.prototype = {
      returnPlayer() {}
    };
    function CombatStub() {}
    CombatStub.prototype = {
      attackSetup() {}
    };
    monsters = new MonstersStub()
    combat = new CombatStub()
    player = new PlayerStub()

    room = new Rooms(monsters, player, combat)

    leonPlayer = {name: 'leon', health: 100, armor: 5, armorName: 'Plate', weaponName: 'Dagger', weaponMin: 3, weaponMax: 5, strength: 3, dexterity: 3}
    lucaMonster = {name: 'luca', health: 100, armor: 4, armorName: 'Leather', weaponName: 'Long Sword', weaponMin: 5, weaponMax: 8, strength: 4, dexterity: 4}
    leonHurtPlayer = {name: 'leon', health: 47, armor: 5, armorName: 'Plate', weaponName: 'Dagger', weaponMin: 3, weaponMax: 5, strength: 3, dexterity: 3}
    leonDeadPlayer = {name: 'leon', health: 0, armor: 5, armorName: 'Plate', weaponName: 'Dagger', weaponMin: 3, weaponMax: 5, strength: 3, dexterity: 3}

  });

  describe("#roomSelect", function() {
    it("wins game after beating zombie room", function() {
      spyOn(player, "returnPlayer").and.returnValue(leonPlayer);
      spyOn(monsters, "returnMonster").and.returnValue(lucaMonster);
      spyOn(combat, "attackSetup").and.returnValue(leonHurtPlayer);
      room.roomSelect()
      expect(room.zombieRoom()).toEqual(leonHurtPlayer)
      expect(room.healthChecker()).toEqual(true)
      expect(room.escapeRoom()).toEqual('you have won!')
    });
    it("loses game after zombie loss", function() {
      spyOn(player, "returnPlayer").and.returnValue(leonDeadPlayer);
      spyOn(monsters, "returnMonster").and.returnValue(lucaMonster);
      spyOn(combat, "attackSetup").and.returnValue(leonDeadPlayer);
      room.roomSelect()
      expect(room.zombieRoom()).toEqual(leonDeadPlayer)
      expect(room.healthChecker()).toEqual(false)
      expect(room.roomSelect()).toEqual('you have lost')
    });
  });

  describe("#zombieRoom", function() {
    it("returns player after Zombie Room", function() {
      spyOn(player, "returnPlayer").and.returnValue(leonPlayer);
      spyOn(monsters, "returnMonster").and.returnValue(lucaMonster);
      spyOn(combat, "attackSetup").and.returnValue(leonHurtPlayer);
      room.zombieRoom()
      expect(room.zombieRoom()).toEqual(leonHurtPlayer)
    });
  });

  describe("#healthChecker", function() {
    it("returns true for player being full health", function() {
      spyOn(player, "returnPlayer").and.returnValue(leonPlayer);
      expect(room.healthChecker()).toEqual(true)
    });
    it("returns false for player being dead", function() {
      spyOn(player, "returnPlayer").and.returnValue(leonDeadPlayer);
      expect(room.healthChecker()).toEqual(false)
    });
  });

  describe("#escapeRoom", function() {
    it("Win the game", function() {
      expect(room.escapeRoom()).toEqual('you have won!')
    });
  });
  describe("#loseGame", function() {
    it("Lose the game", function() {
      expect(room.loseGame()).toEqual("you have lost")
    });
  });
});