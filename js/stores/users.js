"use strict";

import AbstractStore from './abstractStore'
import AppDispatcher from '../blogDispatcher'
import AppConstants from '../appConsts'
import Actions        from 'appRoot/actions';
import Request        from 'superagent';
import Config         from 'appRoot/appConfig';
import SessionStore from './sessionContext'

var store = Object.assign({}, AbstractStore, {
	users: [],
	endpoint: Config.apiRoot + '/users',
	init: function () {
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
					Actions.login(res.body.username, res.body.password);
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
	}
});

store.init();

store.dispatchToken = AppDispatcher.register(function (payload) {
	let actionType = payload.actionType,
		details = payload.details;

	switch (actionType){
		case AppConstants.CREATE_USER :
			store.onCreateUser(Object.assign({op : "new"},details));
			AppDispatcher.waitFor(SessionStore.dispatchToken)
			break;
		case AppConstants.EDIT_USER :
			store.onEditUser(Object.assign({op : "edit"}, details));
			break;
	}
})

export default store;