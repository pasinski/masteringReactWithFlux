/**
 * Created by michal on 03.07.16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Login from 'appRoot/views/login'
import UserStore from 'appRoot/stores/users'


var request = require('superagent')
var mockedRequest = require('superagent-mocker')(request);



describe('LoginView', function () {

    it("should do the login", function () {

        mockedRequest.get(UserStore.endpoint, function (request) {
            return { ok : true, body : [{
                "blogName": "my nice blog, yeah",
                "username": "michal",
                "password": "michal",
                "profileImage": "DSC_0030.JPG",
                "firstName": "michal",
                "lastName": "pasinski",
                "email": "michal",
                "profileImageData": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPCEtLSBDcmVhdGVkIHdpdGggTWV0aG9kIERyYXcgLSBodHRwOi8vZ2l0aHViLmNvbS9kdW9waXhlbC9NZXRob2QtRHJhdy8gLS0+CiA8Zz4KICA8dGl0bGU+YmFja2dyb3VuZDwvdGl0bGU+CiAgPHJlY3QgZmlsbD0iIzAwZmZmZiIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjgyIiB3aWR0aD0iODIiIHk9Ii0xIiB4PSItMSIvPgogIDxnIGRpc3BsYXk9Im5vbmUiIG92ZXJmbG93PSJ2aXNpYmxlIiB5PSIwIiB4PSIwIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIiBpZD0iY2FudmFzR3JpZCI+CiAgIDxyZWN0IGZpbGw9InVybCgjZ3JpZHBhdHRlcm4pIiBzdHJva2Utd2lkdGg9IjAiIHk9IjAiIHg9IjAiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiLz4KICA8L2c+CiA8L2c+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPGVsbGlwc2Ugcnk9IjE1IiByeD0iMTUiIGlkPSJzdmdfMSIgY3k9IjMyLjUiIGN4PSI0MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiMwMDAiIGZpbGw9IiNmZmYiLz4KICA8ZWxsaXBzZSBzdHJva2U9IiMwMDAiIHJ5PSI2MS41IiByeD0iMzguNDk5OTk4IiBpZD0ic3ZnXzIiIGN5PSIxMTIiIGN4PSIzOS41IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9IiNmZmYiLz4KIDwvZz4KPC9zdmc+",
                "id": 6
            }]}
        })

        const login = TestUtils.renderIntoDocument(<Login/>)
        const loginNode = ReactDOM.findDOMNode(login);
        

        let inputs = TestUtils.scryRenderedDOMComponentsWithTag(login, 'input')

        let userName = inputs.find(
            input => input.getAttribute('name') == 'username'
        )

        let password = inputs.find(
            input => input.getAttribute('name') == 'password'
        )

        userName.value = 'haha'
        password.value = 'haha'

        let form = TestUtils.findRenderedDOMComponentWithTag(login, 'form')


        TestUtils.Simulate.submit(form)

    })
})