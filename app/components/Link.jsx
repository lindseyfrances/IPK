import React from 'react';

class Link extends React.Component {

    render() {
        let { dest, children } = this.props;
        return (
            <a className='link' onClick={() => {window.open(dest, '_blank');}}>{children}</a>
        );
    }
}

export default Link;
