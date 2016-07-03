"use strict";

import AbstractStore from './abstractStore'
import AppDispatcher from '../blogDispatcher'
import AppConstants from '../appConsts'
import Actions        from 'appRoot/actions';
import Request        from 'superagent';
import Config         from 'appRoot/appConfig';
import SessionStore from 'sessionContext'

export default Object.assign({}, AbstractStore, {
	users: [],
	endpoint: Config.apiRoot + '/users',
	loginFinished : function(context){
		this.emitSuccess(context)
	},
	init: function () {
		SessionStore.addChangeListener(this.loginFinished)
		Request
			.get(this.endpoint)
			.end(function (err, res) {
				if (res.ok) {
					this.users = res.body;
					this.emitSuccess(this.users);
				} else {
				}
			}.bind(this)); 
	},
	// called when mixin is used to init the component state
	getInitialState: function () { 
		return this.users;
	},
	modifyUser: function (method, details, action) {
		Request
			[method](this.endpoint)
			.send(details)
			.end(function (err, res) {
				if (res.ok) {
					Actions.login(res.body.username, res.password);
				} else {
					this.emitFailure(err);
				} 
			}.bind(this));
			; 
	},
	onCreateUser: function (details) {
		console.log("create user action", this);
		this.modifyUser('post', details);
	},
	onEditUser: function (details) {
		this.modifyUser('put', details);
	},
	dispatchToken : AppDispatcher.register(function (payload) {
		let actionType = payload.actionType;

		switch (actionType){
			case AppConstants.CREATE_USER :
				let details = payload.details;
				this.onCreateUser(details);
				break;
			case AppConstants.EDIT_USER : 
				let details = payload.details;
				this.onEditUser(details);
				break;
		}
	})
});
