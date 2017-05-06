/*
 * CaseStudyIntroduction.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import LighthouseIntroduction from './LighthouseIntroduction';

class CaseStudyIntroduction extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { params } = this.props;
        const renderPageContent = () => {
            switch (params.caseStudy) {
                case 'lighthouse':
                    return <LighthouseIntroduction />
            }
        }

        return renderPageContent();
    }
}

export default CaseStudyIntroduction;
