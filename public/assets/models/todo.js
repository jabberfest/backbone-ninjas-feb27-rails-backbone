/*global Backbone*/
var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	app.Todo = Backbone.Model.extend({
        constructor: function(){

            $(document).on('pubnub.todo.destroy', $.proxy(function(e,data){
                if(data.model.id==this.get('id')&&data.uuid!=UUID){
                    this.destroy()
                }
            }, this))

            $(document).on('pubnub.todo.update', $.proxy(function(e,data){
                if(data.model.id==this.get('id')&&data.uuid!=UUID){
                    this.set(data.model)
                }
            }, this))

            Backbone.Model.apply(this, arguments)
        },
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			title: '',
			completed: false
		},

		// Toggle the `completed` state of this todo item.
		toggle: function () {
			this.save({
				completed: !this.get('completed')
			});
		}

	});

}());
