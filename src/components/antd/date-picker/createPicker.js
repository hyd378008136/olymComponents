import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import RcDatePicker from 'rc-calendar/lib/Picker';
import classNames from 'classnames';
import omit from 'omit.js';
import Icon from '../icon';
import { getLocaleCode } from '../_util/getLocale';
import warning from '../_util/warning';
export default function createPicker(TheCalendar) {
    return _a = class CalenderWrapper extends React.Component {
            constructor(props) {
                super(props);
                this.renderFooter = (...args) => {
                    const { prefixCls, renderExtraFooter } = this.props;
                    return renderExtraFooter ? (React.createElement("div", { className: `${prefixCls}-footer-extra` }, renderExtraFooter(...args))) : null;
                };
                this.clearSelection = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleChange(null);
                };
                this.handleChange = (value) => {
                    const props = this.props;
                    if (!('value' in props)) {
                        this.setState({ value });
                    }
                    props.onChange(value, (value && value.format(props.format)) || '');
                };
                const value = props.value || props.defaultValue;
                if (value && !moment.isMoment(value)) {
                    throw new Error('The value/defaultValue of DatePicker or MonthPicker must be ' +
                        'a moment object after `antd@2.0`, see: https://u.ant.design/date-picker-value');
                }
                this.state = {
                    value,
                };
            }
            componentWillReceiveProps(nextProps) {
                if ('value' in nextProps) {
                    this.setState({
                        value: nextProps.value,
                    });
                }
            }
            render() {
                const { value } = this.state;
                const props = omit(this.props, ['onChange']);
                const { prefixCls, locale } = props;
                const placeholder = ('placeholder' in props)
                    ? props.placeholder : locale.lang.placeholder;
                const disabledTime = props.showTime ? props.disabledTime : null;
                const calendarClassName = classNames({
                    [`${prefixCls}-time`]: props.showTime,
                    [`${prefixCls}-month`]: MonthCalendar === TheCalendar,
                });
                let pickerChangeHandler = {};
                let calendarHandler = {};
                if (props.showTime) {
                    calendarHandler = {
                        // fix https://github.com/ant-design/ant-design/issues/1902
                        onSelect: this.handleChange,
                    };
                }
                else {
                    pickerChangeHandler = {
                        onChange: this.handleChange,
                    };
                }
                warning(!('onOK' in props), 'It should be `DatePicker[onOk]` or `MonthPicker[onOk]`, instead of `onOK`!');
                const calendar = (React.createElement(TheCalendar, Object.assign({}, calendarHandler, { disabledDate: props.disabledDate, disabledTime: disabledTime, locale: locale.lang, timePicker: props.timePicker, defaultValue: props.defaultPickerValue || moment(), dateInputPlaceholder: placeholder, prefixCls: prefixCls, className: calendarClassName, onOk: props.onOk, format: props.format, showToday: props.showToday, monthCellContentRender: props.monthCellContentRender, renderFooter: this.renderFooter })));
                // default width for showTime
                const pickerStyle = {};
                if (props.showTime) {
                    pickerStyle.width = (props.style && props.style.width) || 154;
                }
                const clearIcon = (!props.disabled && props.allowClear && value) ? (React.createElement(Icon, { type: "cross-circle", className: `${prefixCls}-picker-clear`, onClick: this.clearSelection })) : null;
                const input = ({ value: inputValue }) => (React.createElement("div", null,
                    React.createElement("input", { disabled: props.disabled, readOnly: true, value: (inputValue && inputValue.format(props.format)) || '', placeholder: placeholder, className: props.pickerInputClass }),
                    clearIcon,
                    React.createElement("span", { className: `${prefixCls}-picker-icon` })));
                const pickerValue = value;
                const localeCode = getLocaleCode(this.context);
                if (pickerValue && localeCode) {
                    pickerValue.locale(localeCode);
                }
                const style = Object.assign({}, props.style, pickerStyle);
                return (React.createElement("span", { className: classNames(props.className, props.pickerClass), style: style },
                    React.createElement(RcDatePicker, Object.assign({}, props, pickerChangeHandler, { calendar: calendar, value: pickerValue, prefixCls: `${prefixCls}-picker-container`, style: props.popupStyle }), input)));
            }
        },
        _a.contextTypes = {
            antLocale: PropTypes.object,
        },
        _a.defaultProps = {
            prefixCls: 'ant-calendar',
            allowClear: true,
            showToday: true,
        },
        _a;
    var _a;
}
