/*
 * PageContainer.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';

class PageContainer extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { children, location } = this.props;
        debugger;
        return (
            <div>
                <h1>{location.pathname}</h1>
                {children}
            </div>
        );
    }
}

export default PageContainer;
