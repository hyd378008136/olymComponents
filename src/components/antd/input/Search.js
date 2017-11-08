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
import classNames from 'classnames';
import Input from './Input';
import Icon from '../icon';
export default class Search extends React.Component {
    constructor() {
        super(...arguments);
        this.onSearch = () => {
            const { onSearch } = this.props;
            if (onSearch) {
                onSearch(this.input.refs.input.value);
            }
            this.input.focus();
        };
    }
    render() {
        const _a = this.props, { className, inputPrefixCls, prefixCls, suffix } = _a, others = __rest(_a, ["className", "inputPrefixCls", "prefixCls", "suffix"]);
        delete others.onSearch;
        const searchIcon = (React.createElement(Icon, { className: `${prefixCls}-icon`, onClick: this.onSearch, type: "search", key: "searchIcon" }));
        const searchSuffix = suffix ? [suffix, searchIcon] : searchIcon;
        return (React.createElement(Input, Object.assign({ onPressEnter: this.onSearch }, others, { className: classNames(prefixCls, className), prefixCls: inputPrefixCls, suffix: searchSuffix, ref: node => this.input = node })));
    }
}
Search.defaultProps = {
    inputPrefixCls: 'ant-input',
    prefixCls: 'ant-input-search',
};
