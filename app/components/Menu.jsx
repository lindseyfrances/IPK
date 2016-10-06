import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { toggleMenu } from 'app/actions/actions';

export class Menu extends React.Component {
    componentWillEnter(callback) {
        const elt = findDOMNode(this);
        //TODO: This doesn't really work :(
        elt.style.right = '-200px';
        elt.style.transition = 'right 0.5s';
        elt.style.webkitTransition = 'right 0.5s';
        elt.style.right = '0px';

        setTimeout(function() {
            callback();
        }, 500);
    }

    componentWillLeave(callback) {
        const elt = findDOMNode(this);
        elt.style.right = '-200px';
        setTimeout(function() {
            callback();
        }, 500);
    }

    render() {
        const { handleClose } = this.props;
        return (
            <div className='menu'>
                <p>menu</p>
                <button onClick={handleClose}>X</button>
            </div>
        );
    }
}

export default Menu;
