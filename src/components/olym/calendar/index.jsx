import React, { Component } from "react";
import { Calendar as AntdCalendar} from 'antd';
import './styles/index.less';

class Calendar extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <AntdCalendar {...this.props} className="o-calendar"/>
    )
  }
}

export default Calendar;
