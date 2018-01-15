import * as React from 'react';
import Icon from '../icon';
import Input from '../input';
export default class Search extends React.Component {
    constructor() {
        super(...arguments);
        this.handleChange = (e) => {
            const onChange = this.props.onChange;
            if (onChange) {
                onChange(e);
            }
        };
        this.handleClear = (e) => {
            e.preventDefault();
            const handleClear = this.props.handleClear;
            if (handleClear) {
                handleClear(e);
            }
        };
    }
    render() {
        const { placeholder, value, prefixCls } = this.props;
        const icon = (value && value.length > 0) ? (React.createElement("a", { href: "#", className: `${prefixCls}-action`, onClick: this.handleClear },
            React.createElement(Icon, { type: "cross-circle" }))) : (React.createElement("span", { className: `${prefixCls}-action` },
            React.createElement(Icon, { type: "search" })));
        return (React.createElement("div", null,
            React.createElement(Input, { placeholder: placeholder, className: prefixCls, value: value, ref: "input", onChange: this.handleChange }),
            icon));
    }
}
Search.defaultProps = {
    placeholder: '',
};
