var config = {
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
  var tmpl = makeTemplate('TestingTemplate')
    , eventName = "set" + config.name.charAt(0).toUpperCase() + config.name.slice(1);
  State.mixin(tmpl, config);
  test.isNotUndefined(tmpl.__eventMaps[0][eventName], 'State.mixin() set event is not undefined');
  test.isNotNull(tmpl.__eventMaps[0][eventName], 'State.mixin() set event is not null');
});

Tinytest.add('State - State.mixin() - helpers map created', function (test) {
  var tmpl = makeTemplate('TestingTemplate');
  State.mixin(tmpl, config);
  test.equal(_.keys(tmpl.__helpers).length, 3, 'State.mixin() creates 3 helpers');
});

Tinytest.add('State - State.mixin() - helpers function correctly', function (test) {
  var tmpl = makeTemplate('TestingTemplate');
  State.mixin(tmpl, config);
  
  var view = Blaze.render(tmpl, document.body);
  Blaze.currentView = view;

  var stateHelper = view.lookup(config.name);
  test.isNotUndefined(stateHelper, 'State.mixin() state helper is not undefined');
  test.isNotNull(stateHelper, 'State.mixin() state helper is not null');
  test.equal(stateHelper(), "red", 'State.mixin() state helper returns default value');

  var optionsHelper = view.lookup(config.name + "Options");
  test.isNotUndefined(optionsHelper, 'State.mixin() options helper is not undefined');
  test.isNotNull(optionsHelper, 'State.mixin() options helper is not null');
  test.equal(optionsHelper(), config.options, 'State.mixin() options helper returns options array');

  var isCurrentHelper = view.lookup("isCurrent" + config.name.charAt(0).toUpperCase() + config.name.slice(1));
  test.isNotUndefined(isCurrentHelper, 'State.mixin() isCurrent helper is not undefined');
  test.isNotNull(isCurrentHelper, 'State.mixin() isCurrent helper is not null');
  test.equal(isCurrentHelper(config.default), true, 'State.mixin() isCurrent helper returns true');
});