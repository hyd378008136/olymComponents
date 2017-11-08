var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React, { Children } from 'react';
import classNames from 'classnames';
import TimelineItem from './TimelineItem';
export default class Timeline extends React.Component {
    render() {
        const _a = this.props, { prefixCls, children, pending, className } = _a, restProps = __rest(_a, ["prefixCls", "children", "pending", "className"]);
        const pendingNode = typeof pending === 'boolean' ? null : pending;
        const classString = classNames(prefixCls, {
            [`${prefixCls}-pending`]: !!pending,
        }, className);
        // Remove falsy items
        const falsylessItems = Children.toArray(children).filter(item => !!item);
        const items = Children.map(falsylessItems, (ele, idx) => React.cloneElement(ele, {
            last: idx === (Children.count(falsylessItems) - 1),
        }));
        const pendingItem = (!!pending) ? (React.createElement(TimelineItem, { pending: !!pending }, pendingNode)) : null;
        return (React.createElement("ul", Object.assign({}, restProps, { className: classString }),
            items,
            pendingItem));
    }
}
Timeline.Item = TimelineItem;
Timeline.defaultProps = {
    prefixCls: 'ant-timeline',
};
