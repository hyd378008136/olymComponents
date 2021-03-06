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
import RcSelect, { Option, OptGroup } from './rc-select';
import classNames from 'classnames';
import warning from '../_util/warning';
const SelectPropTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.oneOf(['default', 'large', 'small']),
    combobox: PropTypes.bool,
    notFoundContent: PropTypes.any,
    showSearch: PropTypes.bool,
    optionLabelProp: PropTypes.string,
    transitionName: PropTypes.string,
    choiceTransitionName: PropTypes.string,
};
// => It is needless to export the declaration of below two inner components.
// export { Option, OptGroup };
export default class TextAreaSelect extends React.Component {
    constructor(props) {
        super(props);
        // by FEN 为了解决第一次点击的时候不出数据
        this.handlerfirstFocus = () => {
            if (this.state.isFirstFocus) {
                this.props.onFirstFocus && this.props.onFirstFocus();
                this.setState({
                    isFirstFocus: false
                });
            }
            this.props.onFocus && this.props.onFocus();
        };
        this.state = {
            isFirstFocus: true
        };
    }
    getLocale() {
        const { antLocale } = this.context;
        if (antLocale && antLocale.Select) {
            return antLocale.Select;
        }
        return {
            notFoundContent: '无匹配结果',
        };
    }
    render() {
        const _a = this.props, { prefixCls, className = '', size, mode, 
        // @deprecated
        multiple, tags, combobox } = _a, restProps = __rest(_a, ["prefixCls", "className", "size", "mode", "multiple", "tags", "combobox"]);
        warning(!multiple && !tags && !combobox, '`Select[multiple|tags|combobox]` is deprecated, please use `Select[mode]` instead.');
        const cls = classNames({
            [`${prefixCls}-lg`]: size === 'large',
            [`${prefixCls}-sm`]: size === 'small',
        }, className);
        const locale = this.getLocale();
        let { notFoundContent = locale.notFoundContent, optionLabelProp } = this.props;
        const isCombobox = mode === 'combobox' || combobox;
        if (isCombobox) {
            notFoundContent = null;
            // children 带 dom 结构时，无法填入输入框
            optionLabelProp = optionLabelProp || 'value';
        }
        const modeConfig = {
            multiple: mode === 'multiple' || multiple,
            tags: mode === 'tags' || tags,
            combobox: isCombobox,
        };
        return (React.createElement(RcSelect, Object.assign({}, restProps, modeConfig, { prefixCls: prefixCls, className: cls, optionLabelProp: optionLabelProp || 'children', notFoundContent: notFoundContent, onFocus: this.handlerfirstFocus })));
    }
}
TextAreaSelect.Option = Option;
TextAreaSelect.OptGroup = OptGroup;
TextAreaSelect.defaultProps = {
    prefixCls: 'ant-select',
    showSearch: false,
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
};
TextAreaSelect.propTypes = SelectPropTypes;
TextAreaSelect.contextTypes = {
    antLocale: PropTypes.object,
};
