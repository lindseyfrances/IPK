/*
 * BottomNavItem.jsx
 * Copyright (C) 2016 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import NavItemCategory from 'app/components/Nav/NavItemCategory';

class BottomNavItem extends React.Component {
    render() {
        const { title, toggled, style, type } = this.props;

        const renderContent = () => {
            switch (type) {
                case 'category':
                    return <NavItemCategory title={title} toggled={toggled} style={style} />;
                default:
                    return (
                        <div className='nav-item' style={style}>
                            <p>{title}</p>
                        </div>
                    );
            }
        };

        return renderContent();
    }
}

BottomNavItem.propTypes = {
    title: React.PropTypes.string.isRequired,
    toggled: React.PropTypes.bool,
    style: React.PropTypes.object.isRequired,
    type: React.PropTypes.string.isRequired
};

export default BottomNavItem;
