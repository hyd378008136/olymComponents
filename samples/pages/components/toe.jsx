import React,{Component} from "react";
import {Toe} from 'olym'

const value = "安达市大军大所大大大大大所大所安达市大军大所大大大大大";
const value2 = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
const value3 = "hello word hello word hello word hello word hello word hello word"

class ToeSample extends Component{
    constructor(props) {
        super(props)
    }

    render(){
        return (
        <div>
            <Toe width="324px" value={value}/>
            <Toe width="324px" value={value2}/>
            <Toe width="324px" value={value3}/>
        </div>

        )
    }
}

export default ToeSample