/**
 * Created by michal on 13.06.16.
 */

"use strict"

import Request   from 'superagent'
import React     from 'react';
import PostStore from 'appRoot/stores/posts';
import expect    from 'expect';

var request = require('superagent')
var mockedRequest = require('superagent-mocker')(request);


describe('OnGetPost', function () {

   before(function () {
      mockedRequest.clearRoutes()
   })

   
  
   it('should get the value for posts', function () {

      mockedRequest.get(PostStore.endpoint, function(req) {
         console.log(JSON.stringify(req))
         return {
            ok: true,
            id: 12,
            body: 'Hello World!',
            content: 'Hello World!'
         };
      });


      return PostStore.getPostsByPage(1, {}).then(function (result) {
         expect(result).toExist()
         expect(result.results).toBe('Hello World!');
      });
   })
   
   it('should fire an event with a post being get', function () {

      mockedRequest.get(PostStore.endpoint, function(req) {
         return {
            ok: true,
            body: [{
               "title": "Another Post",
               "body": "<div>Hello World!</div><div><b>This</b> is my story...</div><div><br></div>",
               "user": 5,
               "date": 1440132069760,
               "summary": "Hello World!\nThis is my story...\n\n",
               "id": 1
            }]
         };
      });
      
      var post = null;
      var listener = function(payload){
         expect(payload.success).toBe(true)
         expect(payload.payload).toExist()
         expect(payload.payload.id).toEqual(1)
      }
      PostStore.addChangeListener(listener);
      PostStore.onGetPost(1);
   })

});