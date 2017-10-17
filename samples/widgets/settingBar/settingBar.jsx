import React, {Component} from 'react'
import {render}  from 'react-dom';
import { Tabs  } from 'antd';
import classnames  from 'classnames';

import Panel from 'olym/panel'
//style
import './settingBar.less';

class SettingBar extends Component{
    constructor(props){
        super(props)
        this.state ={
            enable:false
        }
    }

    toggleEnable = (type) =>{
        var stateType = false;
        switch (type){
            case "show":
                stateType = true;
                break;
            case "hide": 
                stateType = false;
                break;
            default:
                stateType = !this.state.enable;
        }
        this.setState({
            enable:stateType
        })
    }

    render(){
        return (
            <div className={classnames("layout__setting-bar",{"enable":this.state.enable})}>
                <Panel title="设置" isTransparent={true}>
                    <a href="#" onClick={this.toggleEnable}>close</a>
                </Panel>
            </div>
        );
    }
}

export default SettingBar;