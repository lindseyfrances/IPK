import React from 'react';
import { findDOMNode } from 'react-dom';

export class Menu extends React.Component {
    componentWillEnter(callback) {
        // const elt = findDOMNode(this);
        //TODO: This doesn't really work :(
        // elt.style.right = '-200px';
        // elt.style.transition = 'right 0.5s';
        // elt.style.webkitTransition = 'right 0.5s';
        // elt.style.right = '0px';

        setTimeout(() => {
            callback();
        }, 500);
    }

    componentWillLeave(callback) {
        const elt = findDOMNode(this);
        elt.style.right = '-200px';
        setTimeout(() => {
            callback();
        }, 500);
    }

    render() {
        const { handleClose, handleOpenForm } = this.props;
        return (
            <div className='menu'>
                <p>menu</p>
                <button onClick={handleOpenForm}>Add to the Map</button>
                <button className='close-menu-btn' onClick={handleClose}>X</button>
            </div>
        );
    }
}

Menu.propTypes = {
    handleClose: React.PropTypes.func.isRequired,
    handleOpenForm: React.PropTypes.func.isRequired
};

export default Menu;
