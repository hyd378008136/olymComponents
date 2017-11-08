import React,{Component} from "react";

import {DatePicker as ADatePicker} from 'antd'
import moment from 'moment'

const AntdRangePicker = ADatePicker.RangePicker

class RangePicker extends Component{
    constructor(props) {
        super(props)
        this.state = {};
    }

    render(){
        const {id,onChange,value,...otherProps} = this.props;
        const format = this.props.format || "YYYY-MM-DD";
        if(!Array.isArray(value)){
            throw new TypeError('RangePicker 组件的 value 只接受 "Array" 格式的数据');
        }
        let _value = [];
        value.map((v)=>{
            if(typeof v === 'string'){
                _value.push(moment(v,format))
            }else{
                _value.push(v)
            }

        })
        const props = {
            id,
            value:_value,
            ...otherProps,
            format
        };
        if(onChange){
            props.onChange = (dates,dateStrings)=>onChange(id,dates,dateStrings)
        }
        return(
            <AntdRangePicker {...props}/>
        )
    }
}
export default RangePicker