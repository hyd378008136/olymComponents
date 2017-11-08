var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from 'react';
import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import ScrollNumber from './ScrollNumber';
import classNames from 'classnames';
import warning from '../_util/warning';
export default class Badge extends React.Component {
    render() {
        const _a = this.props, { count, showZero, prefixCls, scrollNumberPrefixCls, overflowCount, className, style, children, dot, status, text } = _a, restProps = __rest(_a, ["count", "showZero", "prefixCls", "scrollNumberPrefixCls", "overflowCount", "className", "style", "children", "dot", "status", "text"]);
        const isDot = dot || status;
        let displayCount = count > overflowCount ? `${overflowCount}+` : count;
        // dot mode don't need count
        if (isDot) {
            displayCount = '';
        }
        const isZero = displayCount === '0' || displayCount === 0;
        const isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
        const hidden = (isEmpty || (isZero && !showZero)) && !isDot;
        const scrollNumberCls = classNames({
            [`${prefixCls}-dot`]: isDot,
            [`${prefixCls}-count`]: !isDot,
        });
        const badgeCls = classNames(className, prefixCls, {
            [`${prefixCls}-status`]: !!status,
            [`${prefixCls}-not-a-wrapper`]: !children,
        });
        warning(!(children && status), '`Badge[children]` and `Badge[status]` cannot be used at the same time.');
        // <Badge status="success" />
        if (!children && status) {
            const statusCls = classNames({
                [`${prefixCls}-status-dot`]: !!status,
                [`${prefixCls}-status-${status}`]: true,
            });
            return (React.createElement("span", { className: badgeCls },
                React.createElement("span", { className: statusCls }),
                React.createElement("span", { className: `${prefixCls}-status-text` }, text)));
        }
        const scrollNumber = hidden ? null : (React.createElement(ScrollNumber, { prefixCls: scrollNumberPrefixCls, "data-show": !hidden, className: scrollNumberCls, count: displayCount, title: count, style: style }));
        const statusText = (hidden || !text) ? null : (React.createElement("span", { className: `${prefixCls}-status-text` }, text));
        return (React.createElement("span", Object.assign({}, restProps, { className: badgeCls }),
            children,
            React.createElement(Animate, { component: "", showProp: "data-show", transitionName: children ? `${prefixCls}-zoom` : '', transitionAppear: true }, scrollNumber),
            statusText));
    }
}
Badge.defaultProps = {
    prefixCls: 'ant-badge',
    scrollNumberPrefixCls: 'ant-scroll-number',
    count: null,
    showZero: false,
    dot: false,
    overflowCount: 99,
};
Badge.propTypes = {
    count: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    showZero: PropTypes.bool,
    dot: PropTypes.bool,
    overflowCount: PropTypes.number,
};
