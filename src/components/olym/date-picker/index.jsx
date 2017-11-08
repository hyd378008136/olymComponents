import React,{Component} from "react";

import {DatePicker as ADatePicker} from 'antd'
import RangePicker from './RangePicker'

class DatePicker extends Component{
    constructor(props) {
        super(props)
        this.state = {};
    }

    render(){
        const {id,onChange,value,...otherProps} = this.props;
        const format = this.props.format || "YYYY-MM-DD";
        let _value;
        if(typeof value === 'string'){
            _value = moment(value,format)
        }else{
            _value = value
        }
        const props = {
            id,
            value:_value,
            ...otherProps,
            format
        }
        if(onChange){
            props.onChange = (dates)=>onChange(id,dates)
        }
        return(
            <ADatePicker {...props}/>
        )
    }
}
DatePicker.RangePicker = RangePicker
export default DatePicker