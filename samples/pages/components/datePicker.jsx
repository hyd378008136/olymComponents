import React,{Component} from "react";
import {DatePicker} from 'olym';

const RangePicker = DatePicker.RangePicker

class DatePickerSample extends Component{
    constructor(props) {
        super(props)
        this.state = {
            value:["2017-09-09","2017-10-10","2017-11-11"]
        };
    }

    render(){
        return(
            <div>
                <RangePicker id="p" onChange={(id,dates,dateStrings)=>{
                    console.log(id,dates,dateStrings)
                    this.setState({
                        value:dateStrings
                    })
                }} value={this.state.value}/>
            </div>
        )
    }
}
export default DatePickerSample;