import React,{Component} from "react";

import {DatePicker as ADatePicker} from 'antd'
import moment from 'moment'
import common from './common'

const {compatible} = common

const AntdRangePicker = ADatePicker.RangePicker

class RangePicker extends Component{
    constructor(props) {
        super(props)
        this.state = {};
    }

    render(){
        const {id,onChange,value = ['', ''],momentLocale,...otherProps} = this.props;
        const format = this.props.format || "YYYY-MM-DD";
        const props = {
            id,
            // value:_value,
            ...otherProps,
            format
        };

        if(value){
            let _value = [];
            if(!Array.isArray(value)){
                throw new TypeError('RangePicker 组件的 value 只接受 "Array" 格式的数据');
            }

            _value = compatible(value,format,momentLocale)
            props.value = _value
        }


        if(onChange){
            props.onChange = (dates,dateStrings)=>onChange(dates,dateStrings,id)
        }
        return(
            <AntdRangePicker {...props}/>
        )
    }
}
export default RangePicker