"use strict";

import React             from 'react';
import { Link, hashHistory } from 'react-router';
import Actions           from 'appRoot/actions';
import SearchStore       from 'appRoot/stores/search';
import SessionStore      from 'appRoot/stores/sessionContext';
import AppConstants		 from 'appRoot/appConsts'
 
export default React.createClass({

	getInitialState : function () {
		console.log("SessionStore", SessionStore)
		return {session : SessionStore.context};
	},

	onChangeSession : function (){
		this.setState({session : SessionStore.context});
	},
	
	onChangeSearch : function(){
		this.setState({query : SearchStore.query})
	},

	componentDidMount : function(){
		SessionStore.on(AppConstants.CHANGE_EVENT, this.onChangeSession);
		SearchStore.on(AppConstants.CHANGE_EVENT, this.onChangeSearch);
	},

	logOut: function () {
		console.log('logout')
		Actions.logout();
		console.log(this.history)
		hashHistory.push('/');
	},
	search: function () {
		var searchVal = this.refs.search.value;
		Actions.search(searchVal);
	},
	render: function () {
		return (
			<header className="app-header">
				<Link to="/"><h1>Re&#923;ction</h1></Link>
				<section className="account-ctrl">
					<input 
						ref="search" 
						type="search" 
						placeholder="search" 
						defaultValue={this.state.initialQuery}
						onChange={this.search} />
						{
							this.state.session.loggedIn ? 
								(<Link to="/posts/create">
									Hello {this.state.session.username}, write something!
								</Link>) : 
								<Link to="/users/create">Join</Link>
						}
						{
							this.state.session.loggedIn ? 
								<a onClick={this.logOut}>Log Out</a> :
								<Link to="/login">Log In</Link> 
						} 
				</section>
			</header> 
		);
	}
});

