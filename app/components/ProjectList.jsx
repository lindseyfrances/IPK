import React from 'react';
import { connect } from 'react-redux';

export class ProjectList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { shouldShow } = this.props;

        return (
            <div className='project-list' style={{opacity: shouldShow ? 1 : 0}}>No Map</div> 
        );
    }
}

export default connect()(ProjectList);
