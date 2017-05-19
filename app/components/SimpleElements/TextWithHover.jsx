/*
 * TextWithHover.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';

class TextWithHover extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { style, text } = this.props;
        return (
            <div style={style}>
                <p>{text}</p>
            </div>
        );
    }
}

export default TextWithHover;
