import React, { cloneElement } from 'react';
import RcDropdown from 'rc-dropdown';
import classNames from 'classnames';
import warning from '../_util/warning';
export default class Dropdown extends React.Component {
    getTransitionName() {
        const { placement = '' } = this.props;
        if (placement.indexOf('top') >= 0) {
            return 'slide-down';
        }
        return 'slide-up';
    }
    componentDidMount() {
        const { overlay } = this.props;
        const overlayProps = overlay.props;
        warning(!overlayProps.mode || overlayProps.mode === 'vertical', `mode="${overlayProps.mode}" is not supported for Dropdown\'s Menu.`);
    }
    render() {
        const { children, prefixCls, overlay, trigger, disabled } = this.props;
        const dropdownTrigger = cloneElement(children, {
            className: classNames(children.props.className, `${prefixCls}-trigger`),
            disabled,
        });
        // menu cannot be selectable in dropdown defaultly
        const overlayProps = overlay && overlay.props;
        const selectable = (overlayProps && 'selectable' in overlayProps)
            ? overlayProps.selectable : false;
        const fixedModeOverlay = cloneElement(overlay, {
            mode: 'vertical',
            selectable,
        });
        return (React.createElement(RcDropdown, Object.assign({}, this.props, { transitionName: this.getTransitionName(), trigger: disabled ? [] : trigger, overlay: fixedModeOverlay }), dropdownTrigger));
    }
}
Dropdown.defaultProps = {
    prefixCls: 'ant-dropdown',
    mouseEnterDelay: 0.15,
    mouseLeaveDelay: 0.1,
    placement: 'bottomLeft',
};
