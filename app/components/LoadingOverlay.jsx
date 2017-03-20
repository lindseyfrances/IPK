import React from 'react';
import { connect } from 'react-redux';

class LoadingOverlay extends React.Component {
    render() {
        const { waitFor } = this.props;
        let isVisible = false;
        waitFor.forEach(l => {
            if (l === true) {
                isVisible = true;
            }
        });

        return (
            <div className={isVisible ? 'loading-overlay visible' : 'loading-overlay hidden'}>
                <h1>Loading</h1>
            </div>
        );
    }
}

export default connect(state => ({
    dataIsLoading: state.dataIsLoading
}))(LoadingOverlay);
