module.exports = {

  "Homepage": function(browser) {
    browser
      .page.homepage().go()
      .page.homepage().checkPage()
    ;
  },

  "Navigation links": function(browser) {
    browser
      .page.nav().checkNav()
    ;
  },

  "About page": function (browser) {
    browser
      .page.about().go()
      .page.about().checkPage()
    ;
  },

  "Create room": function(browser) {
    var testRoomName = "nightwatch test " + browser.capabilities.browserName;

    browser
      .page.homepage().go()
      .page.homepage().createRoom(testRoomName)
      .page.room().checkPage(testRoomName)
    ;
  },

  "Manage room": function(browser) {
    browser
      .page.room().addPlayers()
      .page.room().checkAddPlayers()
      .page.room().checkAddWrongPlayers()
    ;
  },

  "End BASIC test suite": function(browser) {
    browser.end();
  }

};
