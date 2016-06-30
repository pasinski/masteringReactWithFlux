/**
 * Created by michal on 13.06.16.
 */

"use strict"

import Request   from 'superagent'
import React     from 'react';
import PostStore from 'appRoot/stores/posts';
import expect    from 'expect';

describe('OnGetPost', function () {
   let request = require('superagent')
   let mockedRequest = require('superagent-mocker')(request);


   mockedRequest.get(PostStore.endpoint, function(req) {
      return {
         ok: true,
         id: 12,
         body: 'Hello World!',
         content: 'Hello World!'
      };
   });

   it('should get the value for posts', function () {

      return PostStore.getPostsByPage(1, {}).then(function (result) {
         console.log(`resolved ${JSON.stringify(result)}, the results are ${result.results}`);
         expect(result).toExist()
         expect(result.results).toBe('Hello World!');
      });
   })

});