
const initialState = {
    type: '',
    message: ''
}


const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALERT':
            return '1';

        default: return state;

    }
}
export default alertReducer;