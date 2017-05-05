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
                <div
                    key={node.to}
                    className={clsName}
                    onClick={() => props.handleClick(node.pageNumber)}
                >
                        <div className='node-inner'>
                            <p>{node.title}</p>
                            <img />
                        </div>
                    </div>
                );
            }
            )}
        </div>
    );
};
