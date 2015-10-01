if (Meteor.isClient) {
  console.log(Template);
  console.log(Template.TestingTemplate);
  State.mixin(Template.TestingTemplate, {
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