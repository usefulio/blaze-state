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

Tinytest.add('State - event is created', function (test) {
  var tmpl = makeTemplate('TestingTemplate')
    , eventName = "set" + config.name.charAt(0).toUpperCase() + config.name.slice(1);
  State.mixin(tmpl, config);
  test.isNotUndefined(tmpl.__eventMaps[0][eventName], 'State.mixin() set event is not undefined');
  test.isNotNull(tmpl.__eventMaps[0][eventName], 'State.mixin() set event is not null');
});

Tinytest.add('State - helpers map created', function (test) {
  var tmpl = makeTemplate('TestingTemplate');
  State.mixin(tmpl, config);
  test.equal(_.keys(tmpl.__helpers).length, 3, 'State.mixin() creates 3 helpers');
});

Tinytest.add('State - helpers function correctly', function (test) {
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

// Multiple templates tests
Tinytest.add('State (multiple-templates) - event is created', function (test) {
  var tmpl1 = makeTemplate('TestingTemplate')
  , eventName = "set" + config.name.charAt(0).toUpperCase() + config.name.slice(1);
  var tmpl2 = makeTemplate('TestingTemplate2')
  , eventName = "set" + config.name.charAt(0).toUpperCase() + config.name.slice(1);


  State.mixin([tmpl1, tmpl2], config);

  test.isNotUndefined(tmpl1.__eventMaps[0][eventName], 'template1: State.mixin() set event is not undefined');
  test.isNotNull(tmpl1.__eventMaps[0][eventName], 'template1: State.mixin() set event is not null');

  test.isNotUndefined(tmpl1.__eventMaps[0][eventName], 'template2: State.mixin() set event is not undefined');
  test.isNotNull(tmpl1.__eventMaps[0][eventName], 'template2: State.mixin() set event is not null');
});

Tinytest.add('State (multiple-templates) - helpers map created', function (test) {
  var tmpl1 = makeTemplate('TestingTemplate');
  var tmpl2 = makeTemplate('TestingTemplate2');

  State.mixin([tmpl1, tmpl2] , config);

  test.equal(_.keys(tmpl1.__helpers).length, 3, 'template1: State.mixin() creates 3 helpers');
  test.equal(_.keys(tmpl2.__helpers).length, 3, 'template2: State.mixin() creates 3 helpers');
});

Tinytest.add('State (multiple-templates) - helpers function correctly', function (test) {
  var tmpl1 = makeTemplate('TestingTemplate');
  var tmpl2 = makeTemplate('TestingTemplate2');

  State.mixin([tmpl1, tmpl2], config);
  
  var view1 = Blaze.render(tmpl1, document.body);
  var view2 = Blaze.render(tmpl2, document.body);
  Blaze.currentView = view1;

  var stateHelper1 = view1.lookup(config.name);
  test.isNotUndefined(stateHelper1, 'State.mixin() state helper is not undefined');
  test.isNotNull(stateHelper1, 'State.mixin() state helper is not null');
  test.equal(stateHelper1(), "red", 'State.mixin() state helper returns default value');

  var optionsHelper1 = view1.lookup(config.name + "Options");
  test.isNotUndefined(optionsHelper1, 'State.mixin() options helper is not undefined');
  test.isNotNull(optionsHelper1, 'State.mixin() options helper is not null');
  test.equal(optionsHelper1(), config.options, 'State.mixin() options helper returns options array');

  var isCurrentHelper1 = view1.lookup("isCurrent" + config.name.charAt(0).toUpperCase() + config.name.slice(1));
  test.isNotUndefined(isCurrentHelper1, 'State.mixin() isCurrent helper is not undefined');
  test.isNotNull(isCurrentHelper1, 'State.mixin() isCurrent helper is not null');
  test.equal(isCurrentHelper1(config.default), true, 'State.mixin() isCurrent helper returns true');

  Blaze.currentView = view2;

  var stateHelper1 = view1.lookup(config.name);
  test.isNotUndefined(stateHelper1, 'State.mixin() state helper is not undefined');
  test.isNotNull(stateHelper1, 'State.mixin() state helper is not null');
  test.equal(stateHelper1(), "red", 'State.mixin() state helper returns default value');

  var optionsHelper2 = view1.lookup(config.name + "Options");
  test.isNotUndefined(optionsHelper2, 'State.mixin() options helper is not undefined');
  test.isNotNull(optionsHelper2, 'State.mixin() options helper is not null');
  test.equal(optionsHelper2(), config.options, 'State.mixin() options helper returns options array');

  var isCurrentHelper2 = view1.lookup("isCurrent" + config.name.charAt(0).toUpperCase() + config.name.slice(1));
  test.isNotUndefined(isCurrentHelper2, 'State.mixin() isCurrent helper is not undefined');
  test.isNotNull(isCurrentHelper2, 'State.mixin() isCurrent helper is not null');
  test.equal(isCurrentHelper2(config.default), true, 'State.mixin() isCurrent helper returns true');
});

// Multiple template instances tests
Tinytest.add('State (multiple-instances) - event is created', function (test) {
  var tmpl1 = makeTemplate('TestingTemplate')
  , eventName = "set" + config.name.charAt(0).toUpperCase() + config.name.slice(1);
  var tmpl2 = makeTemplate('TestingTemplate')
  , eventName = "set" + config.name.charAt(0).toUpperCase() + config.name.slice(1);


  State.mixin([tmpl1, tmpl2], config);

  test.isNotUndefined(tmpl1.__eventMaps[0][eventName], 'template1: State.mixin() set event is not undefined');
  test.isNotNull(tmpl1.__eventMaps[0][eventName], 'template1: State.mixin() set event is not null');

  test.isNotUndefined(tmpl1.__eventMaps[0][eventName], 'template2: State.mixin() set event is not undefined');
  test.isNotNull(tmpl1.__eventMaps[0][eventName], 'template2: State.mixin() set event is not null');
});

Tinytest.add('State (multiple-instances) - helpers map created', function (test) {
  var tmpl1 = makeTemplate('TestingTemplate');
  var tmpl2 = makeTemplate('TestingTemplate');

  State.mixin([tmpl1, tmpl2] , config);

  test.equal(_.keys(tmpl1.__helpers).length, 3, 'template1: State.mixin() creates 3 helpers');
  test.equal(_.keys(tmpl2.__helpers).length, 3, 'template2: State.mixin() creates 3 helpers');
});

Tinytest.add('State (multiple disconnected instances) - helpers function correctly', function (test) {
  var config = {
    name: 'color'
    , default: 'red'
    , options: [
      'red'
      , 'yellow'
      , 'green'
    ]
  };

  var tmpl1 = makeTemplate('TestingTemplate');
  var tmpl2 = makeTemplate('TestingTemplate');

  State.mixin([tmpl1, tmpl2], config);
  
  var view1 = Blaze.render(tmpl1, document.body);
  var view2 = Blaze.render(tmpl2, document.body);
  var tmplInst1 = view1.templateInstance();
  tmplInst1.color.set('yellow');
  var tmplInst2 = view2.templateInstance();
  tmplInst2.color.set('green');

  // value for Template instance 1 'color' should be 'yellow' and Template instance 2 'color' should be 'green'

  Blaze.currentView = view1;

  var stateHelper1 = view1.lookup(config.name);
  test.isNotUndefined(stateHelper1, 'State.mixin() state helper is not undefined');
  test.isNotNull(stateHelper1, 'State.mixin() state helper is not null');
  test.equal(stateHelper1(), "yellow", 'State.mixin() state helper returns default value');

  var optionsHelper1 = view1.lookup(config.name + "Options");
  test.isNotUndefined(optionsHelper1, 'State.mixin() options helper is not undefined');
  test.isNotNull(optionsHelper1, 'State.mixin() options helper is not null');
  test.equal(optionsHelper1(), config.options, 'State.mixin() options helper returns options array');

  var isCurrentHelper1 = view1.lookup("isCurrent" + config.name.charAt(0).toUpperCase() + config.name.slice(1));
  test.isNotUndefined(isCurrentHelper1, 'State.mixin() isCurrent helper is not undefined');
  test.isNotNull(isCurrentHelper1, 'State.mixin() isCurrent helper is not null');
  test.equal(isCurrentHelper1("yellow"), true, 'State.mixin() isCurrent helper returns true');

  Blaze.currentView = view2;

  var stateHelper2 = view2.lookup(config.name);
  test.isNotUndefined(stateHelper2, 'State.mixin() state helper is not undefined');
  test.isNotNull(stateHelper2, 'State.mixin() state helper is not null');
  test.equal(stateHelper2(), "green", 'State.mixin() state helper returns default value');

  var optionsHelper2 = view2.lookup(config.name + "Options");
  test.isNotUndefined(optionsHelper2, 'State.mixin() options helper is not undefined');
  test.isNotNull(optionsHelper2, 'State.mixin() options helper is not null');
  test.equal(optionsHelper2(), config.options, 'State.mixin() options helper returns options array');

  var isCurrentHelper2 = view2.lookup("isCurrent" + config.name.charAt(0).toUpperCase() + config.name.slice(1));
  test.isNotUndefined(isCurrentHelper2, 'State.mixin() isCurrent helper is not undefined');
  test.isNotNull(isCurrentHelper2, 'State.mixin() isCurrent helper is not null');
  test.equal(isCurrentHelper2("green"), true, 'State.mixin() isCurrent helper returns true');
});

Tinytest.add('State (multiple shared instances) - helpers function correctly', function (test) {
  var config = {
    name: 'color'
    , default: 'red'
    , options: [
      'red'
      , 'yellow'
      , 'green'
    ]
    , shared: true
  };

  var tmpl1 = makeTemplate('TestingTemplate');
  var tmpl2 = makeTemplate('TestingTemplate');

  State.mixin([tmpl1, tmpl2], config);
  
  var view1 = Blaze.render(tmpl1, document.body);
  var view2 = Blaze.render(tmpl2, document.body);
  var tmplInst1 = view1.templateInstance();
  tmplInst1.color.set('yellow');
  var tmplInst2 = view2.templateInstance();
  tmplInst2.color.set('green');

  // value for `color` in both Template instances should be `green`; i.e. the last value set in Instance 2.

  Blaze.currentView = view1;

  var stateHelper1 = view1.lookup(config.name);
  test.isNotUndefined(stateHelper1, 'State.mixin() state helper is not undefined');
  test.isNotNull(stateHelper1, 'State.mixin() state helper is not null');
  test.equal(stateHelper1(), "green", 'State.mixin() state helper returns default value');

  var optionsHelper1 = view1.lookup(config.name + "Options");
  test.isNotUndefined(optionsHelper1, 'State.mixin() options helper is not undefined');
  test.isNotNull(optionsHelper1, 'State.mixin() options helper is not null');
  test.equal(optionsHelper1(), config.options, 'State.mixin() options helper returns options array');

  var isCurrentHelper1 = view1.lookup("isCurrent" + config.name.charAt(0).toUpperCase() + config.name.slice(1));
  test.isNotUndefined(isCurrentHelper1, 'State.mixin() isCurrent helper is not undefined');
  test.isNotNull(isCurrentHelper1, 'State.mixin() isCurrent helper is not null');
  test.equal(isCurrentHelper1("green"), true, 'State.mixin() isCurrent helper returns true');

  Blaze.currentView = view2;

  var stateHelper2 = view2.lookup(config.name);
  test.isNotUndefined(stateHelper2, 'State.mixin() state helper is not undefined');
  test.isNotNull(stateHelper2, 'State.mixin() state helper is not null');
  test.equal(stateHelper2(), "green", 'State.mixin() state helper returns default value');

  var optionsHelper2 = view2.lookup(config.name + "Options");
  test.isNotUndefined(optionsHelper2, 'State.mixin() options helper is not undefined');
  test.isNotNull(optionsHelper2, 'State.mixin() options helper is not null');
  test.equal(optionsHelper2(), config.options, 'State.mixin() options helper returns options array');

  var isCurrentHelper2 = view2.lookup("isCurrent" + config.name.charAt(0).toUpperCase() + config.name.slice(1));
  test.isNotUndefined(isCurrentHelper2, 'State.mixin() isCurrent helper is not undefined');
  test.isNotNull(isCurrentHelper2, 'State.mixin() isCurrent helper is not null');
  test.equal(isCurrentHelper2("green"), true, 'State.mixin() isCurrent helper returns true');
});

