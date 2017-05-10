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
                    key={node.id}
                    className={clsName}
                    onClick={() => props.handleClick(node)}
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
