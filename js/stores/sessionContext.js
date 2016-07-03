"use strict";

import AbstractStore from './abstractStore'
import AppDispatcher from '../blogDispatcher'
import AppConstants from '../appConsts'
import Request from 'superagent';
import Config  from 'appRoot/appConfig';
import Cookie  from 'appRoot/vendor/cookie';

export default Object.assign({}, AbstractStore, {
	endpoint: Config.apiRoot + '/users',
	context: { loggedIn: false },
	
	getInitialState: function () { 
		this.context          = JSON.parse(Cookie.getItem('session')) || {};
		this.context.loggedIn = this.context.loggedIn || false; 
		return this.context; 
	},
	getResponseResolver: function () {
		return function (err, res) {
			if (res.ok && res.body instanceof Array && res.body.length > 0) {
				this.context          = res.body[0];
				this.context.loggedIn = true;
				this.context.profileImageData = null;

				this.emitSuccess(this.context);

				//console.log("SETTING COOKIE", JSON.stringify(this.context), Cookie.setItem);
				Cookie.setItem('session', JSON.stringify(this.context));
			} else {
				this.emitFailure(err)
			} 
		}.bind(this);
	},
	getSessionInfo: function () {
		return JSON.parse(Cookie.getItem('session'));
	},
	onLogin: function (name, pass) {
		Request
			.get(this.endpoint)
			.query({
				'username': name,
				'password': pass
			})
			.end(this.getResponseResolver())
			;
	},
	onLogOut: function () {
		Cookie.removeItem('session');
		this.context = { loggedIn: false };
		this.emitSuccess(this.context);
	},
	
	dispatchToken : AppDispatcher.register(function (payload) {
		let actionType = payload.actionType;
		
		switch (actionType){
			case AppConstants.LOGIN :
				let name = payload.name,
					password = payload.password;
				this.onLogin(name, password);
				break;
		}
	})
});
