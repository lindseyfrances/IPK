import React from 'react';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';

import MapContainer from 'app/components/MapContainer';
import Landing from 'app/components/Landing';

export default (
    <Router history={hashHistory}>
        <Route path='/'>
            <Route path='/map' component={MapContainer} />
            <IndexRoute component={Landing} />
        </Route>
    </Router>
);
