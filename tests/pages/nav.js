module.exports = function(browser) {
  var self = this;

  this._urls = function () {
    var base = "http://curvytron.elao.com";

    return {
      homepage: base,
      about: base + "/#/about",
      room: base + "#/room/",
      externals: {
        github  : "https://github.com/Elao/curvytron",
        twitter : "http://twitter.com/curvytron",
        elao    : "http://www.elao.com/"
      }
    };
  };

  this._selectors = function () {
    var
      nav       = "footer",
      nav_left  = nav + " div:not(.text-right)"
      nav_right = nav + " div.text-right"
    ;

    return {
      github  : nav_left  + " a:nth-of-type(1)",
      twitter : nav_left  + " a:nth-of-type(2)",
      about   : nav_left  + " a:nth-of-type(3)",
      elao    : nav_right + " a:nth-of-type(1)"
    };
  };

  this._texts = function () {
    return {
      about : "About Us",
      elao  : "Handmade by Elao with"
    };
  };

  return {
    goToPage: function (page, param, cssSelector, timeout) {
      return browser.urlWait(self._urls()[page] + (param || ""), cssSelector, timeout);
    },
    clickNav: function(name) {
      return browser.click(self._selectors().nav + " a[title='" + name + "']");
    },
    checkNav: function() {
      return browser
        .assert.elementPresent(self._selectors().about)
        .assert.attributeEquals(self._selectors().about, "href", self._urls().about)
        .assert.containsText(self._selectors().about, self._texts().about)

        .assert.elementPresent(self._selectors().github)
        .assert.attributeEquals(self._selectors().github, "href", self._urls().externals.github)
        .assert.elementPresent(self._selectors().github + " i.icon-github")

        .assert.elementPresent(self._selectors().twitter)
        .assert.attributeEquals(self._selectors().twitter, "href", self._urls().externals.twitter)
        .assert.elementPresent(self._selectors().twitter + " i.icon-twitter")

        .assert.elementPresent(self._selectors().elao)
        .assert.attributeEquals(self._selectors().elao, "href", self._urls().externals.elao)
        .assert.containsText(self._selectors().elao, self._texts().elao)
      ;
    }
  };
};
