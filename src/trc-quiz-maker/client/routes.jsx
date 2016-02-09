import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppHandler from 'trc quiz maker/client/components/AppHandler';
import ErrorHandler from 'trc quiz maker/client/components/ErrorHandler';
import MainPage from 'trc quiz maker/client/components/MainPage';
import OtherPage from 'trc quiz maker/client/components/OtherPage';

var routes = (
    <Route component={AppHandler} path="/">
        <IndexRoute component={MainPage} />
        <Route path="other" component={OtherPage} />
        <Route path="*" component={ErrorHandler}/>
    </Route>
);

module.exports = routes;
