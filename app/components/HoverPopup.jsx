import React from 'react';
import { connect } from 'react-redux';

class HoverPopup extends React.Component {

    render() {
        var { visible, content } = this.props;
        function shouldShowPopup() {
            if (visible) {
                return (
                    <p>
                        {content}
                    </p>
                );
            }
            return null;
        }
        return (
            <div id='hover-popup'>
                {shouldShowPopup()}
            </div>
        );
    }
}

export default connect(
    (state) => state.popup
)(HoverPopup);
