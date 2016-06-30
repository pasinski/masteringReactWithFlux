import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import BasicInput from 'appRoot/components/basicInput'
import expect from 'expect'

describe('BasicInput', function () {
    const basicInput = TestUtils.renderIntoDocument(<BasicInput id="myBasicInput" helptext="Help" />)
    const basicInputNode = ReactDOM.findDOMNode(basicInput);
    console.log(basicInputNode.attributes.getNamedItem('helptext'));
    var asideNode = basicInputNode.childNodes.item(1);
    console.log(asideNode)
    expect(asideNode).toExist();
    expect(asideNode.tagName.toLocaleLowerCase()).toEqual('aside');
    expect(asideNode.textContent).toEqual('Help')
})

