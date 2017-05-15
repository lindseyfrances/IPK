/*
 * Loading animation borrowed from
*/
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
                <div>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    dataIsLoading: state.dataIsLoading
}))(LoadingOverlay);
