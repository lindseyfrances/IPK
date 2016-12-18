/*
 * SearchBar.jsx
 * Copyright (C) 2016 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='searchbar'>
                <input type='text' placeholder='Search' />
                <span className='input-bar'></span>
            </div>
        );
    }
}

export default SearchBar;
