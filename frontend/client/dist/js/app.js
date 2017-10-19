(function () {

  // key names
  var _localStorageKey = 'demo_user_id';

  // selectors
  var _selectors = {
    newUser: '.new-user',
    existingUser: '.existing-user',
    newUserId: '.js-new-user',
    filmClick: '.js-load-films',
    filmList: '.films'
  }

  // routes
  var _filmsRoute = '//';

  // private funcs
  var uuidv4 = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  var _getUserId = function () {
    localStorage.getItem(_localStorageKey);
  }

  var _generateUserId = function () {
    localStorage.setItem(_localStorageKey, uuidv4());
  }

  // setup
  var setupFilmsClick = function () {

  };

  var setupUserIdClick = function () {

  };

  var setupUserHide = function () {

  };

  var init = function () {
    setupFilmsClick();
    setupUserIdClick();
    setupUserHide();
  };

  init();
})();
