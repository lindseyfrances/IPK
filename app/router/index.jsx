import React from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import MapContainer from 'app/components/Map/MapContainer';
import Landing from 'app/components/Landing';

export default (
    <Router history={browserHistory}>
        <Route path='/'>
            <Route path='/map' component={MapContainer} />
            <IndexRoute component={Landing} />
        </Route>
    </Router>
);
