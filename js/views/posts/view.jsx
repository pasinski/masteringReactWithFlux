"use strict";

import React      from 'react';
import Reflux     from 'reflux';
import { Link }   from 'react-router';
import ClassNames from 'classnames';
import Moment     from 'moment';
import Actions    from 'appRoot/actions';
import PostStore  from 'appRoot/stores/posts';
import UserStore  from 'appRoot/stores/users';
import Session    from 'appRoot/stores/sessionContext';
import Loader     from 'appRoot/components/loader';

let dateFormat    = 'MM/DD/YYYY HH:mm:ss';
 
export default React.createClass({
	getInitialState: function () {
		return {
			session : Session.context,
			users : UserStore.users,
			post: this.props.post
		};
	},

	onPostGot : function (payload) {
		if(payload.success){
			console.log("got post, payload", payload)
			//this.state.posts = this.state.posts.concat(data);
			this.setState({
				loading: false,
				post: payload.payload
			});
		}
	},


	componentWillMount: function () {
		if (this.state.post) {
		} else {
			// get post from query params
			this.getPost();
		}
	},
	componentDidMount : function () {
		PostStore.addChangeListener(this.onPostGot)
	},

	getUserFromPost: function (post) {
		return Array.find(this.state.users, function (user) {
			return user.id === post.user;
		});
	},
	getPost: function () {
		if (this.isMounted()) {
			this.setState({loading: true});
		} else {
			this.state.loading = true;
		}

		Actions.getPost(this.props.params.postId)
	},

	shouldComponentUpdate : function(nextprops, nextstate){
		console.log(nextstate)
		return true;
	},

	render: function () {
		if (this.state.loading) { return <Loader />; }
		var post = this.state.post
		,   user = this.getUserFromPost(post)
		,   name = user && user.firstName && user.lastName ? user.firstName + ' ' + user.lastName : 'dupa';

		console.log("state session", this.state.session);
 
		return this.props.mode === 'summary' ? (
			// SUMMARY / LIST VIEW
			<li className="post-view-summary">
				<aside>
					<img className="profile-img small" src={user != null ? user.profileImageData : ''} />
					<div className="post-metadata">
						<strong>{post.title}</strong>
						<span className="user-name">{name}</span>
						<em>{Moment(post.date, 'x').format(dateFormat)}</em> 
					</div>
				</aside>
				<summary>{post.summary}</summary>
				&nbsp;
				<Link to={`/posts/${post.id}`}>read more</Link> 
				
			</li> 
		) : (
			// FULL POST VIEW
			<div className="post-view-full">

				<div className="post-view-container">
					<h2>
						<img className="profile-img" src={user.profileImageData} />
						<div className="post-metadata">
							<strong>{post.title}</strong>
							<span className="user-name">{name}</span>
							<em>{Moment(post.date, 'x').format(dateFormat)}</em> 
						</div> 
					</h2>
					<section className="post-body" dangerouslySetInnerHTML={{__html: post.body}}>
					</section>
				</div>
			</div>

		);
	}
});
 
