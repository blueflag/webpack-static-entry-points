import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';

import store from 'trc quiz maker/client/store';
import routes from 'trc quiz maker/client/routes';
import clientStyles from 'trc quiz maker/client/sass/styles.scss';

var appElement = document.getElementById('trc quiz maker');
var history = createBrowserHistory();

function renderDevtools() {
    if (process.env.NODE_ENV === 'development') {
        var Devtools = require('trc quiz maker/client/devtools');
        return <Devtools store={store} />;
    } 
}

//
// Render Town
//
ReactDOM.render((
    <div>
        <Provider store={store}>
            <Router history={history} routes={routes}/>
        </Provider>
        {renderDevtools()}
    </div>
), appElement);
