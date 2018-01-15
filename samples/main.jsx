// import 'ibos/styles/framework.less';
import 'react-hot-loader/patch';
import React from 'react'
import {render} from 'react-dom';
import {BrowserRouter, hashHistory, HashRouter, IndexRoute, Link, NavLink, Route, Router, Switch} from './reactRouter';
// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');
// require('fetch-ie8');
import Frame from './widgets/layout/frame'
import 'antd/style/v2-compatible-reset'
import {AppContainer} from 'react-hot-loader';

function getDemo(nextState, cb) {
    const {component, sub} = nextState.params;
    console.log(nextState)
    if (sub) {
        cb(null, require(`./pages/${component}/${sub}`));
    } else {
        cb(null, require(`./pages/${component}`));
    }
}

// const Home = () => (
//     <div>
//         <h2>Home</h2>
//     </div>
// )

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

const Topics = ({match}) => {
    console.log(match);

    return (<div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
            <h3>Please select a topic.</h3>
        )}/>
    </div>)
}

const Topic = ({match}) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)
render(
    <AppContainer>
        <BrowserRouter >
            <div>
                <Frame/>
            </div>
        </BrowserRouter></AppContainer>,
    document.getElementById("app")
);

