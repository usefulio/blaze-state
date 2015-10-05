# Mixin for adding reactive state to Blaze Templates

This is a simple shortcut to standardize how you add reactive state variables to your Blaze Templates.

### Installation
`meteor add useful:blaze-state`

### Usage

**State.mixin(templateClass, options)**

`templateClass` is the reference the Template you want to extend.

`options` is an object that recognizes the following keys:

> name: string name of the state variable you want to create 
>
> default: (optional) any value you want the state variable to be initialized to upon creation
>
> options: (optional) array of any values you want be considered valid values for the state variable NOTE that no validation is currently done on setting

For example:
```js
State.mixin(Template.CustomTemplate, {
  name: 'color'
  , default: 'red'
  , options: [
    'red'
    , 'yellow'
    , 'green'
  ]
});
```

### What you get.

**Template Helpers**

If you name your state variable 'color'...

`{{color}}` `{{colorOptions}}` `{{isCurrentColor "red"}}`

**Template Event Handlers**

If you name your state variable "food"... triggering the event `setFood` on your template and passing 
the new value as the last parameter will update the state variable to the new value.

e.g.
```js
// where needed in your template code
$('some element inside your template or e.currentTarget').trigger('setFood', [newValue]);
```

Of course, it is often much easier just to just set the variable directly. e.g.
```js
Template.instance().food.set(newValue);
```
