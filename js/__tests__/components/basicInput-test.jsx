import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import BasicInput from 'appRoot/components/basicInput'
import expect from 'expect'

describe('BasicInput', function () {
    const basicInput = TestUtils.renderIntoDocument(<BasicInput id="myBasicInput" helptext="Help" />)
    const basicInputNode = ReactDOM.findDOMNode(basicInput);
    var asideNode = basicInputNode.childNodes.item(1);
    expect(asideNode).toExist();
    expect(asideNode.tagName.toLocaleLowerCase()).toEqual('aside');
    expect(asideNode.textContent).toEqual('Help')
})

