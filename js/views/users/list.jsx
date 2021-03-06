"use strict";

import React     from 'react';

import { Link }  from 'react-router';
import UserStore from 'appRoot/stores/users';
import UserView  from 'appRoot/components/users/view';
import AppConstants from 'appRoot/appConsts'

export default React.createClass({

	getInitialState : function () {
		return {users : UserStore.users}
	},
	
	componentDidMount : function () {
		UserStore.on(AppConstants.CHANGE_EVENT, this.onChange)
	},
	
	onChange : function (payload) {
		if(payload.result == "success"){
			this.setState({users : payload.payload})
		} else {
			this.setState({users : null})
		}
	},
	
	render: function () {
		return (
			<ul className="user-list">
				{this.state.users ? 
					this.state.users.map(function (v) {
						return (
							<li key={v.id}>
								<Link to={`/users/${v.id}`}>
									<UserView userId={v.id} small={true} />
								</Link>
							</li>
						);
					}) : []
				}
			</ul>
		);
	}
});
 
