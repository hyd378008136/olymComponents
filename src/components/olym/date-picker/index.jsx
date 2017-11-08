import React,{Component} from "react";

import {DatePicker as ADatePicker} from 'antd'
import RangePicker from './RangePicker'

class DatePicker extends Component{
    constructor(props) {
        super(props)
        this.state = {};
    }

    render(){
        return(
            <ADatePicker {...this.props}/>
        )
    }
}
DatePicker.RangePicker = RangePicker
export default DatePicker