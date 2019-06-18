import { combineReducers } from 'redux';
import employees from './EmployeeReducer'
import alert from './AlertReducer'


const appStore = combineReducers({
    employees,
    alert

})

export default appStore;