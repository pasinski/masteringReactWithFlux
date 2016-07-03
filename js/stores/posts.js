"use strict";

import {EventEmitter} from 'events'
import AppDispatcher from '../blogDispatcher'
import AbstractStore from './abstractStore'
import AppConstants from '../appConsts'
import Request from 'appRoot/SuperAgentMock'
import Config  from 'appRoot/appConfig';

export default Object.assign({}, AbstractStore, {

	endpoint: Config.apiRoot + '/posts',

	getPostsByPage: function (page = 1, params) {
		var start   = Config.pageSize * (page-1)
		,   end     = start + Config.pageSize
		,   query   = {
				// newest to oldest
				'_sort':  'date',
				'_order': 'DESC',
				'_start': Config.pageSize * (page-1),
				'_end':   Config.pageSize * (page-1) + Config.pageSize
			}
		,   us = this
		;

		if (typeof params === 'object') { 
			// ES6 extend object
			Object.assign(query, params);
		}

		if (this.currentRequest) {
			this.currentRequest.abort();
			this.currentRequest = null;
		} 

		return new Promise(function (resolve, reject) {
			us.currentRequest = Request.get(us.endpoint);
			us.currentRequest
				.query(query)
				.end(function (err, res) {
					console.log('let us end the query' + res.ok)
					var results = res.body;
					function complete () {
						console.log('complete the action');
						resolve({ start: query._start, end: query._end, results: results });
					}
					if (res.ok) {
						console.log("completing")
						// if q param (search) filter by other params, cause it doesn't
						// problem with json-server, realistically we'd fix this on the server
						if (params.q) {
							results = results.filter(function (post) {
								return params.user ? post.user == params.user : true;
							});
						}
						console.log("almost completing")
						Config.loadTimeSimMs ? setTimeout(complete, Config.loadTimeSimMs) : complete();
					} else {
						console.log("rejecting")
						reject(Error(err));
					}
					this.currentRequest = null;
				}.bind(us)); 
		});
	},
	//-- ACTION HANDLERS
	onGetPost: function (id) {
		console.log('getting post with id', id)
		function req () {
			Request
				.get(this.endpoint)
				.query({
					id: id
				})
				.end(function (err, res) {
					if (res && res.ok) {
						if (res.body.length > 0) {
							this.emitSuccess(res.body[0]);
						} else {
							this.emitFailure('Post (' + id + ') not found');
						}
					} else {
						this.emitFailure(err);
					} 
				}.bind(this));
		}
		Config.loadTimeSimMs ? setTimeout(req.bind(this), Config.loadTimeSimMs) : req.bind(this)();
	},
	onModifyPost: function (post, id) {
		function req () {
			Request
				[id ? 'put' : 'post'](id ? us.endpoint+'/'+id : this.endpoint)
				.send(post)
				.end(function (err, res) {
					if (res.ok) {
						this.emitSuccess(res);
					} else {
						this.emitFailure();
					}
				});
		}
		Config.loadTimeSimMs ? setTimeout(req.bind(this), Config.loadTimeSimMs) : req.bind(this)();
	},
	dispatchToken : AppDispatcher.register(function(payload){
		console.log(`Postsstore, received ${payload}`)
		let action = payload.actionType;
		let id = payload.id;
		switch (action){
			case AppConstants.GET_POST :
				this.onGetPost(id);
				break;
			case AppConstants.MODIFY_POSTS :
				let post = payload.post;
				this.onModifyPost(post, id);
				break;

		}
	})
});
