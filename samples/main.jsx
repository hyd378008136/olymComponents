// import 'ibos/styles/framework.less';
import 'react-hot-loader/patch';
import React, {Component} from 'react'
import {render}  from 'react-dom';
import { Router, Route,IndexRoute,hashHistory,BrowserRouter } from './reactRouter';

// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');
// require('fetch-ie8');
import Frame from './widgets/layout/frame'
import Home from './pages/home'
import { AppContainer } from 'react-hot-loader';

import Layout from "./pages/components/layout";
function getDemo(nextState, cb) {
    const {component,sub} = nextState.params;
    console.log(nextState)
    if(sub){
        cb(null, require(`./pages/${component}/${sub}`));
    }else {
        cb(null, require(`./pages/${component}`));
    }
}

render(
    <BrowserRouter>
        <Route path="/" component={Frame}>
            {/*<IndexRoute component={Home}/>*/}
            {/*<Route path=":component(/:sub)" getComponent={getDemo}/>*/}
            <Route path="/components/layout" component={Layout}/>
        </Route>
    </BrowserRouter>,
    document.getElementById("app")
);