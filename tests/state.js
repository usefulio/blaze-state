if (Meteor.isClient) {
  console.log(Template);
  console.log(Template.testingTemplate);
  State.mixin(Template.testingTemplate, {
    name: 'color'
    , default: 'red'
    , options: [
      'red'
      , 'yellow'
      , 'green'
    ]
  });

  Tinytest.add('State - first', function (test) {
    test.equal(1, 1);
  });
}