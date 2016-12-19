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
        // If the props change, set the scroll top to 0 so
        // the user sees the top of the content
        if (!_.isEqual(prevProps, this.props)) {
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

        let className = 'map-banner';   // Build className as we go
        let closed = true;              // if true, adds 'closed' class to banner to ensure it's hidden
        let connectionCounter = 0;      // Count number of connections for display
        // let projectList = [];
        const lists = {};               // Build out list of projects to show in ProjectList component

        // If we have a project selected, we want to list all of that
        // project's connections
        if (project) {
            // Group connections by category
            projects[selectedProjectId].connections.forEach(id => {
                // If category has already been created
                if (lists[projects[id].category]) {
                    // Add projects one by one to property
                    lists[projects[id].category].push(projects[id]);
                } else {
                    // Create property for the first time
                    lists[projects[id].category] = [projects[id]];
                }

                // Iterate counter
                connectionCounter++;
            });
            closed = false;
        } else {
            // If not project is selected, Check to see if any
            // categories are visible, if so collect the visible projects
            // from the categories list
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

        // If closed is true, add '.closed' to className
        if (closed) {
            className += ' closed';
        }

        // Banner should be expanded only if it's not closed
        // and is expanded
        if (!closed && expanded) {
            className += ' expanded';
        }

        // Render different components depending on whether we have
        // a selected project or not
        if (selectedProjectId) {
            return (
                <div className={className} ref={c => { this._elt = c; }}>
                    <div className='map-banner-content'>
                        <h2>{project.name}</h2>
                        <p>{project.description}</p>
                        <h3>Ways to get involved</h3>
                        <div>
                            <span>I eat here </span><input type='number' /><span> time(s) a week</span>
                        </div>
                        <ul>By eating here once a week...
                            {project.consequences && project.consequences.map(c => <li>{c}</li>)}
                        </ul>
                        <h3>{connectionCounter} Connections</h3>
                        {Object.keys(lists).map(cat => <ProjectList key={cat} projectList={lists[cat]} showDescriptions />)}
                    </div>
                    <BackButton onClick={handleClose} />
                    <button onClick={handleExpand}>{expanded ? 'down' : '^'}</button>
                </div>
            );
        }

        // No selected Project -> Render visible categories, or nothing
        return (
            <div className={className} ref={c => { this._elt = c; }}>
                <div className='map-banner-content'>
                    <h2>Currently Visible</h2>
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
    categories: React.PropTypes.object,
    handleExpand: React.PropTypes.func.isRequired,
    expanded: React.PropTypes.bool.isRequired
};

export default MapBanner;
