import React from 'react';
import Select from '../select';
export default class MiniSelect extends React.Component {
    render() {
        return React.createElement(Select, Object.assign({ size: "small" }, this.props));
    }
}
MiniSelect.Option = Select.Option;
