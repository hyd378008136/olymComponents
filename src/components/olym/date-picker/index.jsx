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

  render() {
    const {id, onChange, value = '', defaultValue, momentLocale, ...otherProps} = this.props;
    let {showTime} = this.props;
    const format = this.props.format || "YYYY-MM-DD";
    if (showTime && typeof showTime === 'boolean') {
      showTime = {
        defaultValue: moment('00:00:00', 'HH:mm:ss')
      }
    }
    if (showTime && typeof showTime === 'object') {
      showTime.defaultValue = moment('00:00:00', 'HH:mm:ss')
    }
    const props = {
      id,
      ...otherProps,
      format,
      showTime
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