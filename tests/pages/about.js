module.exports = function(browser) {
  var self = this;

  this._urls = function () {
  };

  this._selectors = function () {
    var
      about  = "#about",
      team   = about + " section:nth-of-type(1)",
      thanks = about + " section:nth-of-type(2)",
      techno = about + " section:nth-of-type(3)"
    ;

    return {
      team: {
        title: team + " h1"
      },
      thanks: {
        title: thanks + " h1"
      },
      techno: {
        title: techno + " h1"
      }
    };
  };

  this._texts = function () {
    return {
      title: "Curvytron",
      team: {
        title: "TEAM"
      },
      thanks: {
        title: "THANKS"
      },
      techno: {
        title: "TECHNOLOGY COLOPHON"
      }
    };
  };

  return {
    go: function () {
      return browser.page.nav().goToPage("about", "", "section#about", 2000);
    },
    checkPage: function() {
      return browser
        .assert.title(self._texts().title)
        .waitForElementPresent(self._selectors().team.title, 10000)
        .assert.containsText(self._selectors().team.title, self._texts().team.title)
        .assert.containsText(self._selectors().thanks.title, self._texts().thanks.title)
        .assert.containsText(self._selectors().techno.title, self._texts().techno.title)
      ;
    }
  };
};
