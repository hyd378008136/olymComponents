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
                <RangePicker id="p" onChange={(id,dates,dateStrings)=>{
                    console.log(id,dates,dateStrings)
                }}/>
            </div>
        )
    }
}
export default DatePickerSample;