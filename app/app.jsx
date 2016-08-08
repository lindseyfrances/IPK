// Client side modules
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import router from 'app/router/index';

// Just grab the action I need
import { initializeProjectList, initializeCategories } from 'app/actions/actions';

// REDUX
import configure from './store/configureStore';
var store = configure();
//window.store = store;

//import Main from './components/Main';

// I know this is bad practice, housing the store globally
// but for now it makes my life easier
//window.store = configureStore();


// Main styles
import './styles/main.scss';

// Initialize project list upon app start
import projectList from 'app/data/build/projectlist.csv';
store.dispatch(initializeProjectList(projectList));
store.dispatch(initializeCategories(projectList));

ReactDOM.render(
    <div>
        <Provider store={store}>
            {router}
        </Provider>
    </div>,
    document.getElementById('app')
);

