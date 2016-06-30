/**
 * Created by michal on 13.06.16.
 */

"use strict";

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _posts = require('appRoot/stores/posts');

var _posts2 = _interopRequireDefault(_posts);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('OnGetPost', function () {
   var request = require('superagent');
   var mockedRequest = require('superagent-mocker')(request);

   mockedRequest.get(_posts2.default.endpoint, function (req) {
      return {
         ok: true,
         id: 12,
         body: 'Hello World!',
         content: 'Hello World!'
      };
   });

   it('should get the value for posts', function () {

      return _posts2.default.getPostsByPage(1, {}).then(function (result) {
         console.log('resolved ' + JSON.stringify(result) + ', the results are ' + result.results);
         (0, _expect2.default)(result).toExist();
         (0, _expect2.default)(result.results).toBe('Hello World!');
      });
   });
});

//# sourceMappingURL=posts-test-compiled.js.map