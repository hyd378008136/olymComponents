import React from 'react';
import PropTypes from 'prop-types';
import RcRate from 'rc-rate';
import Icon from '../icon';
export default class Rate extends React.Component {
    render() {
        return React.createElement(RcRate, Object.assign({}, this.props));
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
