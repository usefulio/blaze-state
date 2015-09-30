Package.describe({
  name: 'useful:state',
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
  // api.use('tinytest');
  // api.use('state');
  // api.addFiles('state-tests.js');
});