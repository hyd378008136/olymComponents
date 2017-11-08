import React,{Component} from "react";

import {DatePicker as ADatePicker} from 'antd'

const AntdRangePicker = ADatePicker.RangePicker

class RangePicker extends Component{
    constructor(props) {
        super(props)
        this.state = {};
    }

    render(){
        const {id,onChange,...otherProps} = this.props;
        const props = {
            id,
            onChange:(dates,dateStrings)=>onChange(dates,dateStrings,id),
            ...otherProps
        }
        return(
            <AntdRangePicker {...props}/>
        )
    }
}
export default RangePicker