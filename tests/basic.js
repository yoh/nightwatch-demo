module.exports = {
  "I am a basic test": function(browser) {
    browser
      .urlWait("http://curvytron.elao.com", "form", 2000)
      .assert.title('Curvytron')
      .assert.attributeEquals("form input[name='name']", "placeholder", "Create room")
      .assert.containsText('footer a[href="/#/about"]', "About Us", "About us link is ok")
      .end()
    ;
  }
};
