import * as React from 'react';
import PropTypes from 'prop-types';
import RcRate from 'rc-rate';
import Icon from '../icon';
export default class Rate extends React.Component {
    constructor() {
        super(...arguments);
        this.saveRate = (node) => {
            this.rcRate = node;
        };
    }
    focus() {
        this.rcRate.focus();
    }
    blur() {
        this.rcRate.blur();
    }
    render() {
        return React.createElement(RcRate, Object.assign({ ref: this.saveRate }, this.props));
    }
}
Rate.propTypes = {
    prefixCls: PropTypes.string,
    character: PropTypes.node,
};
Rate.defaultProps = {
    prefixCls: 'ant-rate',
    character: React.createElement(Icon, { type: "star" }),
};
