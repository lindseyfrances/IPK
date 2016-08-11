import React from 'react';
import { connect } from 'react-redux';

export class ProjectPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        console.log('component unmouting');
    }

    render() {
        var { shouldShow, currentCategory } = this.props;

        if (currentCategory === '') {
        }

        const renderContent = function() {
            if (currentCategory === '') {
                return <h1 className='centered-text'>No Free Lunch</h1>;
            } else {
                return (
                    <h1>Project Panel</h1>
                );
            }
        };
        return (
            <div className='project-list' style={{visibility: shouldShow ? 'visible' : 'hidden'}}>
                {renderContent()}
            </div> 
        );
    }
}

export default connect((state) => {
    return {
        currentCategory: state.currentCategory
    };
})(ProjectPanel);
