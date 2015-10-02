var options = {
  name: 'color'
  , default: 'red'
  , options: [
    'red'
    , 'yellow'
    , 'green'
  ]
};

function makeTemplate(name) {
  return new Template(Template[name].renderFunction);
}

Tinytest.add('State - State.mixin() - event is created', function (test) {
  var tmpl = makeTemplate('TestingTemplate');
  State.mixin(tmpl, options);
  test.equal(tmpl.__eventMaps.length, 1, 'State.mixin() creates 1 event');
});

Tinytest.add('State - State.mixin() - helpers created', function (test) {
  var tmpl = makeTemplate('TestingTemplate');
  State.mixin(tmpl, options);
  test.equal(_.keys(tmpl.__helpers).length, 3, 'State.mixin() creates 3 helpers');
});
