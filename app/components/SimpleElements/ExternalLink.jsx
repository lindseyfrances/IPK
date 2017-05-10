/* global window */
import React from 'react';

class ExternalLink extends React.Component {

    render() {
        const { url, children } = this.props;
        return (
            <a className='link' onClick={() => { window.open(url, '_blank'); }}>{children}</a>
        );
    }
}

ExternalLink.propTypes = {
    url: React.PropTypes.string.isRequired,
    children: React.PropTypes.string.isRequired
};

export default ExternalLink;
