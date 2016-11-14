/* global document */
// Client side modules
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import router from 'app/router/index';
import * as actions from 'app/actions/actions';
import 'react-select/dist/react-select.css';        //React Select Styles
import configure from './store/configureStore';
import './styles/main.scss';                        // Main Styles

const store = configure();
//window.store = store;

//import Main from './components/Main';

// I know this is bad practice, housing the store globally
// but for now it makes my life easier
//window.store = configureStore();

// Initialize project list upon app start
//import projectList from 'app/data/build/projectlist.csv';
//store.dispatch(initializeProjectList(projectList));
//store.dispatch(initializeCategories(projectList));
store.dispatch(actions.initializeProjectListFromDB());

ReactDOM.render(
    <div>
        <Provider store={store}>
            {router}
        </Provider>
    </div>,
    document.getElementById('app')
);

