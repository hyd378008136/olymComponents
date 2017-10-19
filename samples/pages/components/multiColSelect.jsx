import React,{Component} from "react";

import {MultiColSelect} from 'olym'

const dataBody = [
    {
        index:"1",type:"海运出口"
    },
    {
        index:"2",type:"海运进口"
    },
    {
        index:"3",type:"空运出口"
    },
    {
        index:"4",type:"空运进口"
    },
    {
        index:"5",type:"出口陆运"
    },
    {
        index:"6",type:"进口陆运"
    },
    {
        index:"7",type:"出口报关"
    },
    {
        index:"8",type:"进口报关"
    },
    {
        index:"9",type:"铁路运输"
    },
    {
        index:"10",type:"海运拼箱"
    },
    {
        index:"11",type:"空运拼票"
    },
];

const dataHead = [
    {
        dataIndex:"index",title:"序号"
    },{
        dataIndex:"type",title:"类型"
    }
]

class MultiColSelectSample extends Component{

    constructor(props) {
        super(props)
        this.state = {
            value:""
        };
    }

    render(){
        return(
            <MultiColSelect
                dataBody={dataBody}
                dataHeader={dataHead}
                selectKey="type"
                onChange={(contents)=>{
                    this.setState({
                        value:contents
                    })
                }}
                value={this.state.value}
            />
        )
    }
}
export default MultiColSelectSample