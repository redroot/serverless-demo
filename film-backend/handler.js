'use strict';

var getFilms = function () {
  return [
    {
      "id": 1,
      "name": "Star Wars: A New Hope",
      "director": "Steven Spielberg",
      "release": 1977
    },
    {
      "id": 2,
      "name": "Akira",
      "director": "Katsuhiro Otomo",
      "release": 1989
    },
    {
      "id": 3,
      "name": "Princess Mononoke",
      "director": "Hayao Miyazaki",
      "release": 1997
    }
  ];
}

module.exports.getFilms = getFilms;

module.exports.lambda = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(getFilms())
  });
};
