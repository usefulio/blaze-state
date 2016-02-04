# Mixin for adding reactive state to Blaze Templates

This is a simple shortcut to standardize how you add reactive state variables to your Blaze Templates.

### Installation
`meteor add useful:blaze-state`

### Usage

**State.mixin(templateClass, options)**

`templateClass` is the reference to either a single Template or an array of Templates that you want to extend.

`options` is an object that recognizes the following keys:

> name: string name of the state variable you want to create 
>
> default: (optional) any value you want the state variable to be initialized to upon creation
>
> options: (optional) array of any values you want be considered valid values for the state variable NOTE that no validation is currently done on setting
>
> shared: (optional) boolean value; if set to true then all Template instances will share the same state variable.  

For example:
```js
// example 1: Create a unique state variable named 'color' for each new instance 
// 			  of Template.CustomTemplate. Set the default value to 'red' and pass 
// 			  an array of possible valid values.   
State.mixin(Template.CustomTemplate, {
  name: 'color'
  , default: 'red'
  , options: [
    'red'
    , 'yellow'
    , 'green'
  ]
});

// example 2: Create a shared state variable named 'color' between all instances 
// 			  of Template.CustomTemplate
State.mixin(Template.CustomTemplate, { 
	name: 'color'
	, shared: true 
}); 

// example 3: Create a unique state variable named 'color' for each instance of 
// 			  Template.CustomTemplate and Template.OtherTemplate
State.mixin([ Template.CustomTemplate, Template.OtherTemplate ], { 
	name: 'color'
});

// example 4: Create a shared state variable named 'color' between instances of  
			  Template.CustomTemplate and Template.OtherTemplate
State.mixin([ Template.CustomTemplate, Template.OtherTemplate ], { 
	name: 'color', 
	shared: true 
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
