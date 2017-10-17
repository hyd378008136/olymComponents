import React,{Component} from "react";

import {Transfer as ATransfer} from 'antd'

class Transfer extends Component{
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    render(){
        return(
            <ATransfer {...this.props}/>
        )
    }
}

export default Transfer;