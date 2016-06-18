// Client side modules
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';

// REDUX
import configure from './store/configureStore';
var store = configure();
//window.store = store;

import Main from './components/Main';

// I know this is bad practice, housing the store globally
// but for now it makes my life easier
//window.store = configureStore();

// Main styles
import './styles/main.scss';

ReactDOM.render(
    <div>
        <Provider store={store}>
            <Main />
        </Provider>
    </div>,
    document.getElementById('app')
);

