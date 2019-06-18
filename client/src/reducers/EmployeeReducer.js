
const initialState = []


const employeeReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'FETCH_EMPLOYEES':
            return action.employees;
        case 'UPDATE_EMPLOYEE':
            {
                const employees = state;
                const employeeIndex = employees.findIndex(e => e.id === action.employee.id);
                employees[employeeIndex] = action.employee;
                return employees
            };
        case 'ADD_EMPLOYEE':
            return [...state, action.employee];
        case 'REMOVE_EMPLOYEE':
            {
                const employees = state;
                employees.filter(e => e.id !== action.id);
                return state.filter(e => e.id !== action.id)
            };

        default: return state;

    }
}
export default employeeReducer;