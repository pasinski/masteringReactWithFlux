"use strict";

import React   from 'react';
import {hashHistory} from 'react-router'
import BasicInput   from 'appRoot/components/basicInput';
import Actions      from 'appRoot/actions';
import SessionStore	from 'appRoot/stores/sessionContext'


export default React.createClass({
	getInitialState: function () { return {
	}},
	
	onChange : function(payload){
		console.log('payload', payload)
		if(payload.success){
			console.log(`SUCCESS: ${payload}`);
			hashHistory.push('/')
		} else {
			this.setState({'loginError': 'bad username or password'});
		}
	},
	
	componentDidMount : function () {
		SessionStore.addChangeListener(this.onChange)
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

