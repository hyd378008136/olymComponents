import React,{Component} from "react";

import {DatePicker as ADatePicker} from 'antd'
import moment from 'moment'

import common from './common'

const {compatible} = common

const AntdMonthPicker = ADatePicker.MonthPicker

class MonthPicker extends Component{
    constructor(props) {
        super(props)
        this.state = {};
    }

    render(){
        const {id,onChange,value,momentLocale,defaultValue,...otherProps} = this.props;
        const format = this.props.format || "YYYY-MM";
        const props = {
            id,
            ...otherProps,
            format
        };
        if(value){
            const _value = compatible(value,format,momentLocale);
            props.value = _value;
        }
        if(defaultValue){
            const _defaultValue = compatible(defaultValue,format,momentLocale);
            props.defaultValue = _defaultValue;
        }

        if(onChange){
            props.onChange = (dates,dateString)=>onChange(dates,dateString,id)
        }
        return(
            <AntdMonthPicker {...props}/>
        )
    }
}
export default MonthPicker