/* global window */
import React from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import Landing from 'app/components/Landing/Landing';
import Explore from 'app/components/Explore/Explore';
import GetInvolved from 'app/components/GetInvolved/GetInvolved';
import Learn from 'app/components/Learn/Learn';
import CaseStudyList from 'app/components/Learn/CaseStudyList';
import CaseStudyContainer from 'app/components/Learn/CaseStudyContainer';

export default (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
        <Route path='/'>
            <Route path='/learn' component={Learn}>
                <IndexRoute component={CaseStudyList} />
                <Route path='/learn/:caseStudy'>
                    <IndexRoute component={CaseStudyContainer} />
                </Route>
            </Route>
            <Route path='/explore' component={Explore} />
            <Route path='/get-involved' component={GetInvolved} />
            <IndexRoute component={Landing} />
        </Route>
    </Router>
);
