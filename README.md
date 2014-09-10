Nightwatch.js DEMO for Elao Summer Talk
===

>  

# Intro
 - tests de bout en bout via Selenium _(multiplateforme + drivers Chrome / Firefox / IE / Opera / phantomJs)_
 - syntaxe et utilisation simple
 - rapidité de mise en place
 - tourne sous NodeJs
 - tests en parallèle sur plusieurs navigateurs
 - intégration SauceLabs / BrowserStack
 - reporting pour Jenkins / Hudson / Teamcity

>  

# Installation
 - récupération des pré-requis ([Selenium + drivers](http://www.seleniumhq.org/download/))

```
$ mkdir deps
$ wget -O deps/selenium-server-standalone-2.42.2.jar http://selenium-release.storage.googleapis.com/2.42/selenium-server-standalone-2.42.2.jar
100%[=======================================================================>] 34,823,352  4.70MB/s   in 7.3s
2014-09-03 16:18:12 (4.57 MB/s) - 'deps/selenium-2.42.2.jar' saved [34823352/34823352]
$ wget -O deps/chromedriver_mac32.zip http://chromedriver.storage.googleapis.com/2.10/chromedriver_mac32.zip
$ unzip deps/chromedriver_mac32.zip -d deps
Archive:  deps/chromedriver_mac32.zip
inflating: deps/chromedriver
```

 - installation de Nightwatch via NPM _(installation globale)_

```
$ npm install -g nightwatch
$ touch nightwatch.json
$ mkdir tests tests/.reports tests/.logs tests/pages tests/commands tests/assertions tests/screenshots tests/screenshots/baseline tests/screenshots/diff tests/screenshots/results
```

>  

# Configuration
 - Nightwatch use default configuation file named nightwatch.json

```js
{
  "src_folders" : "tests",
  "output_folder" : "tests/.reports",
  "page_objects_path" : "tests/pages",
  "custom_commands_path" : "tests/commands",
  "custom_assertions_path" : "tests/assertions",
  "globals_path" : "",
  "selenium" : {
    "start_process" : true,
    "server_path" : "deps/selenium-server-standalone-2.42.2.jar",
    "log_path" : "tests/.logs",
    "host" : "127.0.0.1",
    "port" : 4444,
    "cli_args" : {
      "webdriver.chrome.driver" : "deps/chromedriver"
    }
  },
  "test_settings" : {
    "default" : {
      "launch_url" : "http://localhost",
      "selenium_port"  : 4444,
      "selenium_host"  : "localhost",
      "silent": true,
      "screenshots" : {
        "enabled" : false,
        "path" : "tests/screenshots"
      },
      "desiredCapabilities": {
        "browserName": "firefox",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    },
    "chrome" : {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    }
  }
}
```

>  

# Write basic test
 - create basic test file

```
$ touch tests/basic.js
```

 - copy/paste this code in ___tests/basic.js___

```js
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
```

 - see Nightwatch API doc at http://nightwatchjs.org/api

>  

# Run tests

```
## run one single test
$ nightwatch -t tests/basic.js
Starting selenium server... started - PID:  79568

[Basic] Test Suite
==================

Running:  I am a basic test

✔  Element <form> was present after 1642 milliseconds.
✔  Testing if the page title equals "Curvytron".
✔  Testing if attribute placeholder of <form input[name='name']> equals "Create room".
✔  About us link is ok

OK. 4 total assertions passed. (6503 ms)

## run tests on chrome
$ nightwatch -e chrome

## run tests on firefox (default) and chrome
$ nightwatch -e default,chrome
```
