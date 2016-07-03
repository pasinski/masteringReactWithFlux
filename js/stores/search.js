"use strict";

import AbstractStore from './abstractStore'
import AppDispatcher from '../blogDispatcher'
import AppConstants from '../appConsts'

var store = Object.assign({}, AbstractStore, {
	getInitialState: function () { 
		return this.query;
	},
	onSearch: function (search) {
		this.query = search;
		this.emitChange(search);
	}
}); 

store.dispatchToken = AppDispatcher.register(function (payload) {
	let actionType = payload.actionType;

	switch( actionType ){
		case AppConstants.SEARCH :
			let search = payload.search;
			this.onSearch(search);
			break;
	}

})

export default store
