(function () {

  // key names
  var localStorageKey = 'demouserid';

  // selectors
  var selectors = {
    newUser: '.new-user',
    existingUser: '.existing-user',
    newUserId: '.js-new-user',
    deleteUserId: '.js-delete-user',
    userIdValue: '.js-user-id',
    filmClick: '.js-load-films',
    filmList: '.films'
  }

  var $ = function (q) { return document.querySelector(q) }

  var uuidv4 = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  var ajax = function(url, callback, data, x) {
  	try {
  		x = new(this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
  		x.open(data ? 'POST' : 'GET', url, 1);
  		x.setRequestHeader('Content-type', 'Content-Type: application/json');
  		x.onreadystatechange = function () {
  			x.readyState > 3 && callback && callback(x.responseText, x);
  		};
  		x.send(data)
  	} catch (e) {
  		window.console && console.log(e);
  	}
  };

  // putting in global so easier to change on the page.
  var getFilmsLocation = function () {
    return window.filmsRoute || 'https://f56r4rjtpk.execute-api.us-east-1.amazonaws.com/devluke/films';
  }

  var getLikesLocation = function () {
    return window.likesRoute || 'https://n3b0rgt5v0.execute-api.us-east-1.amazonaws.com/devluke/likes';
  }

  var getUserId = function () {
    return localStorage.getItem(localStorageKey);
  }

  var generateUserId = function () {
    return localStorage.setItem(localStorageKey, uuidv4());
  }

  var clearUserId = function () {
    return localStorage.removeItem(localStorageKey);
  }

  var addLike = function (userId, filmId) {
    console.log('add Like', userId, filmId);
    ajax(getLikesLocation(), function(responseText) {
      console.log('IT WORKED', responseText);
    }, { user_id: userId, film_id: filmId });
  }

  var filmTemplate = function (data) {
    return `
      <li class='film-item'>
        <h4><strong>${data.name}<strong></h4>
        <h5>${data.release} | ${data.director}</h5>
        <a class='button is-small is-success js-like-film'  data-id='${data.id}'>
          <i class="fa fa-thumbs-up" aria-hidden="true"></i>
          &nbsp;Like
        </a>
        <br />
      </li>
    `;
  }

  // setup
  var setupFilms = function () {
    var list = $(selectors.filmList);
    $(selectors.filmClick).addEventListener('click', function () {
      ajax(getFilmsLocation(), function (responseText) {
        var body = JSON.parse(responseText);
        var content = body.map(filmTemplate).join("");
        list.innerHTML = content;
      })
    });
  };

  var setupLikes = function () {
    document.addEventListener('click', function () {
      var targetElement = event.target || event.srcElement
      if (targetElement && targetElement.className.indexOf('js-like-film') > -1) {
        addLike(getUserId(), targetElement.getAttribute('data-id'));
      }
    });
  };

  var setupUserId = function () {
    var userIdValue = $(selectors.userIdValue);
    userIdValue.innerText = getUserId();

    $(selectors.newUserId).addEventListener('click', function () {
      generateUserId();
      toggleUserBox();
      userIdValue.innerText = getUserId();
    });

    $(selectors.deleteUserId).addEventListener('click', function () {
      clearUserId();
      toggleUserBox();
    });
  };

  var toggleUserBox = function () {
    var newUser = $(selectors.newUser);
    var existingUser = $(selectors.existingUser);
    var id = getUserId();
    if (id  && typeof id == 'string') {
      newUser.className = newUser.className + ' is-hidden'; // hide
      existingUser.className = existingUser.className.replace('is-hidden', ''); //show
    } else {
      newUser.className = newUser.className.replace('is-hidden', ''); //show
      existingUser.className = existingUser.className + ' is-hidden'; //hide
    }
  };

  var init = function () {
    setupUserId();
    setupFilms();
    setupLikes();
    toggleUserBox();
  };

  init();
})();
