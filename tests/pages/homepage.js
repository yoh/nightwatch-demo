module.exports = function(browser) {
  return {
    go: function () {
      return browser.urlWait('http://curvytron.elao.com', "form", 2000);
    },
    checkPage: function() {
      return browser
        .assert.title("Curvytron")
        .assert.attributeEquals("form input[name='name']", 'placeholder', "Create room")
      ;
    },
    createRoom: function(name) {
      return browser
        .setValue("form input[name='name']", name)
        .submitForm("form")
      ;
    }
  };
};
