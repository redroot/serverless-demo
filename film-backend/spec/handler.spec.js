var test = require('tape');
var handler = require('../handler.js')

test('getFilms', (t) => {
  t.plan(2)

  var films = handler.getFilms();

  t.equals(films.length, 3);
  t.equals(films[0].name, "Star Wars: A New Hope");

  t.end();
});

test('lambda', (t) => {
  t.plan(3)

  handler.lambda({},{},(err, resp) => {
    t.equals(err, null);
    t.equals(resp.statusCode, 200)
    t.equals(JSON.stringify(handler.getFilms()), resp.body);
    t.end();
  })
})
