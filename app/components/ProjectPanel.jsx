import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'app/actions/actions';

export const ProjectPanel = function(props) {
    var { dispatch, shouldShow, currentCategory, selectedProject } = props;

    return (
        <div className='project-panel' style={{visibility: shouldShow ? 'visible' : 'hidden'}}>
            <button className='project-panel-back-btn' onClick={() => {dispatch(actions.clearSelectedProject());}}>x</button>
            <h1>{selectedProject.name}</h1>
            <a className='link' href={selectedProject.link}>Learn more</a>
            <p>{selectedProject.description}</p>
        </div> 
    );
};

export default ProjectPanel;
