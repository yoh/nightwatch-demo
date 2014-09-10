module.exports = function(browser) {
  var self = this;

  this._urls = function () {
  };

  this._selectors = function () {
    var
      form_addPlayer = 'form[name="addPlayer"]'
    ;

    return {
      subTitle : "h1",
      details  : ".room-details",
      forms: {
        player: {
          form: form_addPlayer,
          inputUsername: form_addPlayer + ' input[name="username"]'
        }
      }
    };
  };

  this._texts = function () {
    return {
      title    : "Curvytron"
    };
  };

  return {
    go: function(name) {
      return browser
        .page.nav().goToPage("room", name, self._selectors().details, 2000)
      ;
    },
    checkPage: function(name) {
      return browser
        .assert.title(self._texts().title)
        .assert.containsText(self._selectors().subTitle, name.toUpperCase())

        .assert.elementPresent(self._selectors().forms.player.form)
        .assert.elementPresent(self._selectors().forms.player.inputUsername)
        .assert.attributeEquals(self._selectors().forms.player.inputUsername, 'placeholder', "Add a player")
        .assert.attributeEquals(self._selectors().forms.player.inputUsername, 'maxlength', "25")

        .assert.elementPresent('table.room-players')

        .assert.elementPresent('#feed')
        .assert.attributeEquals('form[name="talk"] input[name="message"]', 'placeholder', "Enter message...")
      ;
    },
    addPlayer: function(username) {
      return browser
        .clearValue(self._selectors().forms.player.inputUsername)
        .setValue(self._selectors().forms.player.inputUsername, [username, browser.Keys.ENTER])
        .pause(100)
      ;
    },
    addPlayers: function() {
      return browser
        .page.room().addPlayer('player 1')
        .page.room().addPlayer('player 2')
        .page.room().addPlayer('player 3')
        .page.room().addPlayer('player 4')
      ;
    },
    checkAddPlayers: function() {
      return browser
        .assert.elementPresent("table.room-players tbody tr:nth-of-type(1)", "Player 1 is present")
        .assert.elementPresent("table.room-players tbody tr:nth-of-type(2)", "Player 2 is present")
        .assert.elementPresent("table.room-players tbody tr:nth-of-type(3)", "Player 3 is present")
        .assert.elementPresent("table.room-players tbody tr:nth-of-type(4)", "Player 4 is present")
      ;
    },
    checkAddWrongPlayers: function() {
      return browser
        .page.room().addPlayer('player 1')
        .assert.elementNotPresent("table.room-players tbody tr:nth-of-type(5)", "Player name is unique on the room")

        .page.room().addPlayer('abcdefghijklmnopqrstuvw')
        .assert.elementPresent("table.room-players tbody tr:nth-of-type(5)", "Long player name is truncate but valid")
      ;
    }
  };
};
