"use strict";

import {EventEmitter} from 'events'
import AppDispatcher from '../blogDispatcher'
import AbstractStore from 'appRoot/stores/abstractStore'
import AppConstants from '../appConsts'
import Request from 'superagent'
import Config  from 'appRoot/appConfig';

var store = Object.assign({}, AbstractStore, {

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
					var results = res.body;
					function complete () {
						resolve({ start: query._start, end: query._end, results: results });
					}
					if (res.ok) {
						// if q param (search) filter by other params, cause it doesn't
						// problem with json-server, realistically we'd fix this on the server
						if (params.q) {
							results = results.filter(function (post) {
								return params.user ? post.user == params.user : true;
							});
						}
						Config.loadTimeSimMs ? setTimeout(complete, Config.loadTimeSimMs) : complete();
					} else {
						reject(Error(err));
					}
					this.currentRequest = null;
				}.bind(us)); 
		});
	},
	//-- ACTION HANDLERS
	onGetPost: function (id) {
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
			var us = this;
			Request
				[id ? 'put' : 'post'](id ? us.endpoint+'/'+id : this.endpoint)
				.send(post)
				.end(function (err, res) {
					if (res.ok) {
						us.emitSuccess(res.body);
					} else {
						us.emitFailure(err);
					}
				});
		}
		Config.loadTimeSimMs ? setTimeout(req.bind(this), Config.loadTimeSimMs) : req.bind(this)();
	},
	
});


store.dispatchToken = AppDispatcher.register(function(payload){
	let action = payload.actionType;
	let id = payload.id;
	switch (action){
		case AppConstants.GET_POST :
			store.onGetPost(id);
			break;
		case AppConstants.MODIFY_POSTS :
			let post = payload.post;
			store.onModifyPost(post, id);
			break;

	}
})

export default store