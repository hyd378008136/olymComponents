import React,{Component} from "react";

import {DatePicker as ADatePicker} from 'antd'
import moment from 'moment'

const AntdMonthPicker = ADatePicker.MonthPicker

class MonthPicker extends Component{
    constructor(props) {
        super(props)
        this.state = {};
    }

    render(){
        const {id,onChange,value,...otherProps} = this.props;
        const format = this.props.format || "YYYY-MM-DD";
        let _value = [];
        if(value){
            if(!Array.isArray(value)){
                throw new TypeError('RangePicker 组件的 value 只接受 "Array" 格式的数据');
            }

            // value.map((v)=>{
            //     if(typeof v === 'string'){
            //         let m = moment(v,format);
            //         if(m._isValid){
            //             _value.push(moment(v,format))
            //         }else{
            //             _value.push(v)
            //         }
            //
            //     }else{
            //         _value.push(v)
            //     }
            //
            // })
            //只取前两位,并且在前两位都有值的情况下才显示日期
            if(value[0] && value[1]){
                if(typeof value[0] === "string"){
                    _value.push(moment(value[0],format))
                }else{
                    _value.push(value[0])
                }

                if(typeof value[1] === "string"){
                    _value.push(moment(value[1],format))
                }else{
                    _value.push(value[1])
                }
            }
        }

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
            <AntdMonthPicker {...props}/>
        )
    }
}
export default MonthPicker