import React, {Component} from 'react'

import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';
import SettingBar from '../settingBar/settingBar';
import Footer from '../footer/footer';
//style
import './layout.less';
import {Link, NavLink, Route, Switch} from '../../reactRouter';
import Home from '../../pages/home';
// import DatePicker from '../../pages/components/datePicker';

// import {matchRoutes, renderRoutes} from 'react-router-config';
// import Bundle from '../../Bundle'
// import asyncComponent from '../../asyncComponent'
// const routes= [
//     ... require('../../widgets/nav/HomeNavRouter')
// ]
// const _getComponent = ({match})=>{
//     console.log(match)
//     let {page} = match.params
//     asyncComponent(() => import("../../pages/components/${page}}"));
// }
// const routes = [
//     {
//         path: '/',
//         exact: true,
//         component: Home
//     },
//     {
//         path: '/components/:page',
//         component: Home
//     }
// ];

const getDemo = (nextState, cb) => {
    // console.log(nextState, cb)
    let {match} = nextState;
    let {sub} = match.params
    const C = require(`../../pages/components/${sub}`);
    return <C />;
}

class Layout extends Component {

    toggleSettingBar = (type) => {
        this.refs.layoutSettingBar.toggleEnable(type)
    }

    render() {
        return (
            <div className="layout">
                <Header settingBarHandle={this.toggleSettingBar.bind(this)}/>
                <Sidebar/>
                <div className="layout__content">
                    <Route path="/" exact component={Home}/>
                    <Route path="/components/:sub" component={getDemo}/>
                    <Footer/>
                </div>
                <SettingBar ref="layoutSettingBar"/>
            </div>
        )
    }
}


export default Layout;