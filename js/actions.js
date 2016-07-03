"use strict";

import AppConstants from 'appConsts';
import AppDispatcher from 'blogDispatcher'


var PostsActions = {
		/**
		 * @param  {string} text
		 */
		getPosts : function (page = 1, params) {
			AppDispatcher.dispatch({
				actionType : AppConstants.GET_POSTS,
				page : page,
				params : params
			})
		},
		getPost: function (id) {
			AppDispatcher.dispatch({
				actionType: AppConstants.GET_POST,
				id: id
			});
		},
		modifyPost: function (post, id) {
			AppDispatcher.dispatch({
				actionType: AppConstants.MODIFY_POSTS,
				id: id,
				post: post
			});
		},
		login : function(name, pass){
			AppDispatcher.dispatch({
				actionType : AppConstants.LOGIN,
				name : name,
				pass : pass
			})
		},
		logout : function(){
			AppDispatcher.dispatch({
				actionType : AppConstants.LOGOUT
			})

		},
		createUser : function(details){
			AppDispatcher.dispatch({
				actionType : AppConstants.CREATE_USER,
				details : details
			})
		},
		search : function(search){
			AppDispatcher.dispatch({
				actionType : AppConstants.SEARCH,
				search : search
			})
		}
	}