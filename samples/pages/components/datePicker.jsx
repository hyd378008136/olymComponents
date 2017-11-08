import React,{Component} from "react";
import {DatePicker} from 'olym';

const RangePicker = DatePicker.RangePicker

class DatePickerSample extends Component{
    constructor(props) {
        super(props)
        this.state = {};
    }

    render(){
        return(
            <div>
                <RangePicker id="p" onChange={(dates,dateStrings,id)=>{
                    console.log(dates,dateStrings,id)
                }}/>
            </div>
        )
    }
}
export default DatePickerSample;