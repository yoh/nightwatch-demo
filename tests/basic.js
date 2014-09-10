module.exports = {
  "I am a basic test": function(browser) {
    browser
      .url("http://curvytron.elao.com")
      .assert.title('Curvytron')
      .waitForElementPresent("form", 2000)
      .assert.attributeEquals("form input[name='name']", "placeholder", "Create room")
      .assert.containsText('footer a[href="/#/about"]', "About Us", "About us link is ok")
      .end()
    ;
  }
};
