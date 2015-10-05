Package.describe({
  name: 'useful:blaze-state',
  version: '0.0.1',
  summary: 'Quickly add a state variable to a Blaze Template',
  git: 'https://github.com/usefulio/state.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'reactive-var'
  ], 'client');

  api.addFiles([
    'client/state.js'
  ], 'client');

  api.export('State');

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('useful:state');
  api.use([
    'templating'
    , 'underscore'
  ], 'client');

  api.addFiles([
    'tests/testingTemplate.html'
  ], 'client');

  api.addFiles([
    'tests/state.js'
  ], 'client');
});