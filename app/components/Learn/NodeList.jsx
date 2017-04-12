/*
 * NodeList.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import { Link } from 'react-router';

export default props => {
    const { nodes, activeId } = props;
    return (
        <div className='node-list'>
            {nodes.map(node => {
                let clsName = 'node';
                if (node.id === activeId) {
                    clsName += ' active';
                }
                return (
                    <Link key={node.to} to={node.to} className={clsName}>
                        <div className='node-circle' />
                        <p>{node.title}</p>
                    </Link>
                );
            }
            )}
        </div>
    );
};
