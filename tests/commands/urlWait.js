exports.command = function(url, cssSelector, timeout) {
  return this
    .url(url)
    .waitForElementPresent(cssSelector, timeout)
  ;
};
