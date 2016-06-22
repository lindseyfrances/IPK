import React from 'react';
import { connect } from 'react-redux';

import { setWhereIAm } from './../actions/index';
//import { toggleNav } from './../actions/index';

var rightArrow = require('./../images/rightarrow.png');
var leftArrow = require('./../images/leftarrow.png');
class Nav extends React.Component {
    handleArrow(e) {
        var { dispatch, whereAmI } = this.props;
        switch (e.currentTarget.id) {
            case 'next':
                dispatch(setWhereIAm({
                    ...whereAmI,
                    page: whereAmI.page+=1
                }));
                break;
            case 'back':
                if (whereAmI.page > 0) {
                    dispatch(setWhereIAm({
                        ...whereAmI,
                        page: whereAmI.page-=1
                    }));
                }
                break;
            default:
                break;
        }
    }
    handleClick(e) {
        var { dispatch } = this.props;
        switch (e.currentTarget.textContent) {
            case 'Soil':
                dispatch(setWhereIAm({
                    layer: 'soil',
                    page: 0
                }));
                break;
            case 'Water':
                dispatch(setWhereIAm({
                    layer: 'water',
                    page: 0
                }));
                break;
            case 'Food':
                dispatch(setWhereIAm({
                    layer: 'food',
                    page: 0
                }));
                break;
            case 'Policy/Economics':
                dispatch(setWhereIAm({
                    layer: 'policy',
                    page: 0
                }));
                break;
            case 'Labor':
                dispatch(setWhereIAm({
                    layer: 'labor',
                    page: 0
                }));
                break;
            case 'Energy':
                dispatch(setWhereIAm({
                    layer: 'energy',
                    page: 0
                }));
                break;
            default:
                break;
        }
    } 

    render() {
        var { dispatch } = this.props;
        //console.log('nav rendered with props', this.props);
        return (
            <div className='nav'>
                <div className='nav-left'>
                    <button id='back' onClick={this.handleArrow.bind(this)}>&lt;&lt;</button>
                    <button id='next' onClick={this.handleArrow.bind(this)}>&gt;&gt;</button>
                </div>
                <div className='nav-right'>
                    <p className='layer' onClick={this.handleClick.bind(this)}>Soil</p>
                    <p className='layer' onClick={this.handleClick.bind(this)}>Water</p>
                    <p className='layer' onClick={this.handleClick.bind(this)}>Food</p>
                    <p className='layer' onClick={this.handleClick.bind(this)}>Labor</p>
                    <p className='layer' onClick={this.handleClick.bind(this)}>Policy/Economics</p>
                    <p className='layer' onClick={this.handleClick.bind(this)}>Energy</p>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        whereAmI: state.whereAmI
    };
})(Nav);
