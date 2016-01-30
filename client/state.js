State = {};

/**
	templates = can be either a single template or an array of templates that will share the same state

	options = {
		name: string name of the state variable to keep track of
		(optional) default: default value to initialize state variable to
		(optional) options: object/array that will be made available as the 
			options for this state variable if desired
	}
**/

State.mixin = function(templates, options) {

	var properName = options.name.charAt(0).toUpperCase() + options.name.slice(1);

	var stateVar = new ReactiveVar(options.default);

	if (templates instanceof Blaze.Template) {
		templates = [ templates ]; 
	} 

	var context = {
		properName: properName
		, stateVar: stateVar
	};

	_.each(templates, function (template) {
		// add onCreated hooks
		template.onCreated(function() {
			var tmpl = this;
			tmpl[options.name] = stateVar;
		});

		// add template helper hooks
		var helpers = {};
		helpers[options.name] = function () {
			return Template.instance()[options.name].get();
		}
		helpers[options.name + 'Options'] = function () {
			return options.options;
		}
		helpers['isCurrent' + properName] = function (value) {
			return value === Template.instance()[options.name].get();
		}
		template.helpers(helpers);

		// add event hooks
		var events = {};
		events['set'+properName] = function(e, tmpl, value) {
			Template.instance()[options.name].set(value);
		};
		template.events(events);
	}.bind(context));
};