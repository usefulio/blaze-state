Package.describe({
  name: 'useful:blaze-state',
  version: '0.0.3',
  summary: 'Quickly add a reactive state variable to a Blaze Template',
  git: 'https://github.com/usefulio/blaze-state.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'reactive-var'
    , 'templating'
    , 'underscore'
  ], 'client');

  api.addFiles([
    'client/state.js'
  ], 'client');

  api.export('State', 'client');

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('useful:blaze-state');
  api.use([
    'templating'
    , 'underscore'
  ], 'client');

  api.addFiles([
    'tests/testingTemplate.html'
    , 'tests/testingTemplate2.html'
  ], 'client');

  api.addFiles([
    'tests/state.js'
  ], 'client');
});