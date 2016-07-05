import React from 'react';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';

import Main from 'app/components/Main';
import Landing from 'app/components/Landing';

export default (
    <Router history={hashHistory}>
        <Route path='/'>
            <Route path='/map' component={Main} />
            <IndexRoute component={Landing} />
        </Route>
    </Router>
);
