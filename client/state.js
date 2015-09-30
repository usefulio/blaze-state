State = {};

/**
	options = {
		name: string name of the state variable to keep track of
		(optional) default: default value to initialize state variable to
		(optional) options: object/array that will be made available as the 
			options for this state variable if desired
	}
**/

State.mixin = function(template, options) {

	var properName = options.name.charAt(0).toUpperCase() + options.name.slice(1);

	template.onCreated(function() {
		var tmpl = this;
		tmpl[options.name] = new ReactiveVar(options.default);
	});

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

	var events = {};
	events['set'+properName] = function(e, tmpl, value) {
		Template.instance()[options.name].set(value);
	};
	template.events(events);
};