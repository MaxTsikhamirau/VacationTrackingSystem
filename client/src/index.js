import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import appStore from './reducers/AppStore';
import employeeReducer from './reducers/EmployeeReducer';
import { createStore } from 'redux';

const store = createStore(employeeReducer);


ReactDOM.render(
    (
        <BrowserRouter>
            <App store={store}/>
        </BrowserRouter>
    ), document.getElementById('root'));
registerServiceWorker();
