/**
 * Created by michal on 03.07.16.
 */

import {EventEmitter} from 'events'
import AppConstants from '../appConsts'



export default Object.assign({}, EventEmitter.prototype, {
    emitChange : function(payload){
        this.emit(AppConstants.CHANGE_EVENT, payload);
    },
    emitSuccess : function (payload) {
        this.emitChange(Object.assign({"success" : true}, {payload : payload}))
    },
    emitFailure : function (payload) {
        this.emitChange(Object.assign({"success" : false}, {error : payload}))
    },
    addChangeListener: function(callback) { this.on(AppConstants.CHANGE_EVENT, callback); },
    removeChangeListener: function(callback) { this.removeListener(CHANGE_EVENT, callback); }
})