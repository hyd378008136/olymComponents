import React,{Component} from "react";

import {Select as AntdSelect} from 'antd'

class Select extends Component{
    constructor(props) {
        super(props)
        this.state = {};
    }

    render(){
        const {id,onChange,...otherProps} = this.props;
        const props = {
            id,
            ...otherProps
        };
        if(onChange){
            props.onChange = (value)=>onChange(value,id)
        }
        return(
            <AntdSelect {...props}/>
        )
    }
}
Select.Option = AntdSelect.Option
Select.OptGroup = AntdSelect.OptGroup;
export default Select