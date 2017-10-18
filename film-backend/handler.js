'use strict';

var getFilms = function () {
  return [
    {
      "name": "Star Wars: A New Hope",
      "director": "Steven Spielberg",
      "release": 1977
    },
    {
      "name": "Akira",
      "director": "Katsuhiro Otomo",
      "release": 1989
    },
    {
      "name": "Princess Mononoke",
      "director": "Hayao Miyazaki"
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
