import React,{Component} from "react";
import {Toe} from 'olym'

const value = "安达市大军大所大大大大大所大所安达市大军大所大大大大大"

class ToeSample extends Component{
    constructor(props) {
        super(props)
    }

    render(){
        return (
            <Toe width="324px" value={value}/>
        )
    }
}

export default ToeSample