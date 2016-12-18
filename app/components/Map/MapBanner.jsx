/*
 * MapBanner.jsx
 * Copyright (C) 2016 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import BackButton from 'app/components/BackButton';
import ProjectList from 'app/components/ProjectList';
import _ from 'underscore';

class MapBanner extends React.Component {
    componentDidUpdate(prevProps) {
        console.log('prev props', prevProps);
        console.log('current props', this.props);
        if (!_.isEqual(prevProps, this.props)) {
            console.log('banner did update');
            console.log(this._elt);
            this._elt.scrollTop = 0;
        }
    }

    render() {
        const { selectedProjectId, handleClose, handleExpand, expanded, projects, categories } = this.props;
        console.log('banner did render');

        const project = projects[selectedProjectId];

        // If project exists, then show connected project
        // if it doesn't exist and categories ar evisible, then show visible
        // projects
        // otherwise show nothing

        let className = 'map-banner';
        let closed = true;
        let connectionCounter = 0;
        // let projectList = [];
        const lists = {};

        // TODO: PICK UP HERE!!!!!!
        // PROJECT LIST ISN"T LOADING PROPERLY
        // If we have a single project
        if (project) {
            // Group connections by category
            projects[selectedProjectId].connections.forEach(id => {
                // If category has already been created
                connectionCounter++;
                if (lists[projects[id].category]) {
                    lists[projects[id].category].push(projects[id]);
                } else {
                    lists[projects[id].category] = [projects[id]];
                }
            });
            // projectList = projects[selectedProjectId].connections.map(id => projects[id]);
            closed = false;
        } else {
            // Check to see if any categories are visible
            Object.keys(categories).forEach(cat => {
                if (categories[cat].visible) {
                    categories[cat].projects.forEach(id => {
                        // For each project in visible categories
                        connectionCounter++;
                        if (lists[cat]) {
                            lists[cat].push(projects[id]);
                        } else {
                            lists[cat] = [projects[id]];
                        }
                        // projectList.push(projects[id]);
                    });
                    closed = false;
                }
            });
        }

        console.log('banner', closed);

        if (closed) {
            className += ' closed';
        }

        if (!closed && expanded) {
            className += ' expanded';
        }
        if (selectedProjectId) {
            return (
                <div className={className} ref={c => { this._elt = c; }}>
                    <div className='map-banner-content'>
                        <h2>{project.name}</h2>
                        <p>{project.description}</p>
                        <h3>Ways to get involved</h3>
                        <h3>{connectionCounter} Connections</h3>
                        {Object.keys(lists).map(cat => <ProjectList key={cat} projectList={lists[cat]} showDescriptions />)}
                    </div>
                    <BackButton onClick={handleClose} />
                    <button onClick={handleExpand}>{expanded ? 'down' : '^'}</button>
                </div>
            );
        }
        return (
            <div className={className} ref={c => { this._elt = c; }}>
                <div className='map-banner-content'>
                    <h2>Map Items</h2>
                    {Object.keys(lists).map(cat => <ProjectList key={cat} projectList={lists[cat]} showDescriptions />)}
                </div>
            </div>
        );
    }
}

MapBanner.propTypes = {
    selectedProjectId: React.PropTypes.string,
    handleClose: React.PropTypes.func.isRequired,
    projects: React.PropTypes.object,
    categories: React.PropTypes.object
    // project: React.PropTypes.object,
    // connectedProjects: React.PropTypes.array
};

export default MapBanner;
