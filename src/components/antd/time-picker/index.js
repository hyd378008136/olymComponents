import React from 'react';
import moment from 'moment';
import RcTimePicker from 'rc-time-picker/lib/TimePicker';
import classNames from 'classnames';
import injectLocale from '../locale-provider/injectLocale';
import defaultLocale from './locale/zh_CN';
export function generateShowHourMinuteSecond(format) {
    // Ref: http://momentjs.com/docs/#/parsing/string-format/
    return {
        showHour: (format.indexOf('H') > -1 ||
            format.indexOf('h') > -1 ||
            format.indexOf('k') > -1),
        showMinute: format.indexOf('m') > -1,
        showSecond: format.indexOf('s') > -1,
    };
}
class TimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = (value) => {
            if (!('value' in this.props)) {
                this.setState({ value });
            }
            const { onChange, format = 'HH:mm:ss' } = this.props;
            if (onChange) {
                onChange(value, (value && value.format(format)) || '');
            }
        };
        this.handleOpenClose = ({ open }) => {
            const { onOpenChange } = this.props;
            if (onOpenChange) {
                onOpenChange(open);
            }
        };
        this.saveTimePicker = (timePickerRef) => {
            this.timePickerRef = timePickerRef;
        };
        const value = props.value || props.defaultValue;
        if (value && !moment.isMoment(value)) {
            throw new Error('The value/defaultValue of TimePicker must be a moment object after `antd@2.0`, ' +
                'see: https://u.ant.design/time-picker-value');
        }
        this.state = {
            value,
        };
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({ value: nextProps.value });
        }
    }
    focus() {
        this.timePickerRef.focus();
    }
    getDefaultFormat() {
        const { format, use12Hours } = this.props;
        if (format) {
            return format;
        }
        else if (use12Hours) {
            return 'h:mm:ss a';
        }
        return 'HH:mm:ss';
    }
    render() {
        const props = Object.assign({}, this.props);
        delete props.defaultValue;
        const format = this.getDefaultFormat();
        const className = classNames(props.className, {
            [`${props.prefixCls}-${props.size}`]: !!props.size,
        });
        const addon = (panel) => (props.addon ? (React.createElement("div", { className: `${props.prefixCls}-panel-addon` }, props.addon(panel))) : null);
        return (React.createElement(RcTimePicker, Object.assign({}, generateShowHourMinuteSecond(format), props, { ref: this.saveTimePicker, format: format, className: className, value: this.state.value, placeholder: props.placeholder === undefined ? this.getLocale().placeholder : props.placeholder, onChange: this.handleChange, onOpen: this.handleOpenClose, onClose: this.handleOpenClose, addon: addon })));
    }
}
TimePicker.defaultProps = {
    prefixCls: 'ant-time-picker',
    align: {
        offset: [0, -2],
    },
    disabled: false,
    disabledHours: undefined,
    disabledMinutes: undefined,
    disabledSeconds: undefined,
    hideDisabledOptions: false,
    placement: 'bottomLeft',
    transitionName: 'slide-up',
};
const injectTimePickerLocale = injectLocale('TimePicker', defaultLocale);
export default injectTimePickerLocale(TimePicker);
