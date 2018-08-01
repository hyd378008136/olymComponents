import React, { Component } from "react";

import { DatePicker as ADatePicker } from 'antd'
import RangePicker from './RangePicker'
import MonthPicker from './MonthPicker'
import moment from 'moment'
import common from './common'

const {compatible} = common

class DatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  onOk = () => {
    const {value, onChange, id, onOk, format = 'YYYY-MM-DD'} = this.props;
    if (!value && onChange) {
      const now = moment();
      onChange(now, now.format(format), id)
    }
    onOk && onOk()
  };

  render() {
    const {id, onChange, value = '', defaultValue, momentLocale, onOk, ...otherProps} = this.props;
    const format = this.props.format || "YYYY-MM-DD";
    const props = {
      id,
      ...otherProps,
      format,
      onOk: this.onOk
    };

    if (value !== undefined) {
      const _value = compatible(value, format, momentLocale);
      props.value = _value;
    }
    if (defaultValue) {
      const _defaultValue = compatible(defaultValue, format, momentLocale);
      props.defaultValue = _defaultValue;
    }
    if (onChange) {
      props.onChange = (dates, dateString) => onChange(dates, dateString, id)
    }
    return (
      <ADatePicker {...props}/>
    )
  }
}
DatePicker.RangePicker = RangePicker
DatePicker.MonthPicker = MonthPicker
export default DatePicker