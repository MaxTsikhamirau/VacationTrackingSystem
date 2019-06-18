import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import appStore from './reducers/AppStore';
import employeeReducer from './reducers/EmployeeReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

const store = createStore(appStore);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route component={App} />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
