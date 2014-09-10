module.exports = {
  "Homepage": function(browser) {
    browser
      .page.homepage().go()
      .page.homepage().checkPage()
      .page.homepage().createRoom('nightwatch room')
      .end()
    ;
  }
};
