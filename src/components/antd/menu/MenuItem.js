import React from 'react';
import { Item } from 'rc-menu';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';
class MenuItem extends React.Component {
    render() {
        const { inlineCollapsed } = this.context;
        const props = this.props;
        return React.createElement(Tooltip, { title: inlineCollapsed && props.level === 1 ? props.children : '', placement: "right", overlayClassName: `${props.rootPrefixCls}-inline-collapsed-tooltip` },
            React.createElement(Item, Object.assign({}, props)));
    }
}
MenuItem.contextTypes = {
    inlineCollapsed: PropTypes.bool,
};
MenuItem.isMenuItem = 1;
export default MenuItem;
