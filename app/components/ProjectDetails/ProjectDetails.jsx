/*
 * ProjectDetails.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import BackButton from 'app/components/SimpleElements/BackButton';
import * as actions from 'app/actions/actions';
import ProjectList from 'app/components/ProjectList';

class ProjectDetails extends React.Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
    }

    handleBack() {
        const { dispatch } = this.props;
        dispatch(actions.setSelectedProject(''));
    }

    render() {
        const { selectedProject, projects } = this.props;
        const project = projects[selectedProject];
        const connections = [];
        const lists = {};
        project.connections.forEach(ckey=> {
            let conn = projects[ckey];
            let cat = conn.category;
            if (lists[cat]) {
                lists[cat].push(conn);
            } else {
                lists[cat] = [conn];
            }
        });
                        // {Object.keys(lists).map(cat => <ProjectList key={cat} projectList={lists[cat]} showDescriptions />)}
        return (
            <div className='project-details'>
                <div className='title'>
                    <h2>{project.name}</h2>
                    <BackButton onClick={this.handleBack}/>
                </div>
                <div className='content'>
                    <p>{project.description}</p>
                    {Object.keys(lists).map(cat => <ProjectList key={cat} projectList={lists[cat]} showDescriptions />)}
                </div>
            </div>
        );
    }
}

export default ProjectDetails;
