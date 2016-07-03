"use strict";

import React   from 'react';
import { History }  from 'react-router';
import BasicInput   from 'appRoot/components/basicInput';
import Actions      from 'appRoot/actions';
import AppConstants from 'appRooot/appConst'
import UserStore	from 'appRooot/stores/users'


export default React.createClass({
	mixins: [
		History
	],
	getInitialState: function () { return {
	}},
	
	onChange : function(payload){
		if(payload.result == "success"){
			console.log(`SUCCESS: ${payload}`);
			this.history.pushState('', '/');
		} else {
			this.setState({'loginError': 'bad username or password'});
		}
	},
	
	componentDidMount : function () {
		UserStore.on(AppConstants.CHANGE_EVENT, this.onChange)
	},
	logIn: function (e) {
		var detail = {};

		Array.prototype.forEach.call(
			e.target.querySelectorAll('input'),
			function (v) {
				detail[v.getAttribute('name')] = v.value;
			});
		e.preventDefault(); 
		e.stopPropagation(); 

		Actions.login(detail.username, detail.password);
	},
	render: function () {
		return (
			<form className="login-form" onSubmit={this.logIn}>
				<fieldset>
					<legend>Log In</legend>
					<BasicInput name="username" type="text" placeholder="username" />
					<BasicInput name="password" type="password" placeholder="password" />
					{ this.state.loginError && <aside className="error">{this.state.loginError}</aside> }
					<button type="submit">Log In</button>
				</fieldset>
			</form>
		);
	}
});

