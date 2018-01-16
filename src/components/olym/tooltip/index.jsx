import React,{Component} from "react";
import {Tooltip as ATooltip} from 'antd'

export default class Tooltip extends Component{
    constructor(props) {
        super(props)
    }

    render(){
        const {children,...otherProps} = this.props;
        let {type,...otherChildren} = children;
        //children似乎必须是html标签才行
        if(typeof type != "string"){
            type = "span"
        }
        const tipProps = {
            children:{
                type,
                ...otherChildren
            },
            ...otherProps
        }
        return(
            <ATooltip {...tipProps}/>
        )
    }
}