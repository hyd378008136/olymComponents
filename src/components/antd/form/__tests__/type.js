/* tslint:disable */
import React from 'react';
import Form from '../Form';
// test Form.create on component without own props
class WithoutOwnProps extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            foo: 'bar',
        };
    }
    render() {
        return React.createElement("div", null, "foo");
    }
}
const WithoutOwnPropsForm = Form.create()(WithoutOwnProps);
React.createElement(WithoutOwnPropsForm, null);
class WithOwnProps extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            foo: 'bar',
        };
    }
    render() {
        return React.createElement("div", null, "foo");
    }
}
const WithOwnPropsForm = Form.create()(WithOwnProps);
React.createElement(WithOwnPropsForm, { name: "foo" });
