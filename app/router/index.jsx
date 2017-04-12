import React from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import MapContainer from 'app/components/Map/MapContainer';
import Landing from 'app/components/Landing/Landing';
import Explore from 'app/components/Explore/Explore';
import GetInvolved from 'app/components/GetInvolved/GetInvolved';
import Learn from 'app/components/Learn/Learn';
import PageContainer from 'app/components/Learn/PageContainer';
import CaseStudy from 'app/components/Learn/CaseStudy';
import CaseStudyIntroduction from 'app/components/Learn/CaseStudyIntroduction';
import CaseStudyPage from 'app/components/Learn/CaseStudyPage';
import CaseStudyList from 'app/components/Learn/CaseStudyList';

export default (
    <Router history={browserHistory}>
        <Route path='/'>
            <Route path='/map' component={MapContainer} />
            <Route path='/learn' component={Learn}>
                <IndexRoute component={CaseStudyList} />
                <Route path='/learn/:caseStudy'>
                    <IndexRoute component={CaseStudyIntroduction} />
                    <Route path='/learn/:caseStudy(/:category)(/:pageNumber)' component={CaseStudy} />
                </Route>
            </Route>
            <Route path='/explore' component={Explore} />
            <Route path='/get-involved' component={GetInvolved} />
            <IndexRoute component={Landing} />
        </Route>
    </Router>
);
