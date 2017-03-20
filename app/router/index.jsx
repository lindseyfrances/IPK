import React from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import MapContainer from 'app/components/Map/MapContainer';
import Landing from 'app/components/Landing/Landing';
import Explore from 'app/components/Explore/Explore';
import GetInvolved from 'app/components/GetInvolved/GetInvolved';
import Learn from 'app/components/Learn/Learn';

export default (
    <Router history={browserHistory}>
        <Route path='/'>
            <Route path='/map' component={MapContainer} />
            <Route path='/learn' component={Learn} />
            <Route path='/explore' component={Explore} />
            <Route path='/get-involved' component={GetInvolved} />
            <IndexRoute component={Landing} />
        </Route>
    </Router>
);
