const initialState = {
    click_balance: 0, 
    email: '',
    user_id: 0
}; 

//Action Types 
const INCREMENT_CLICK = 'INCREMENT_CLICK';
const SET_INITIAL_STATE = 'SET_INITIAL_STATE'; 

// Action Builders 
export function incrementClick(click_balance) {
    return {
        type: INCREMENT_CLICK,
        payload: ++click_balance
    }
}

export function setInitialState(userInfo) {
    return {
        type: SET_INITIAL_STATE, 
        payload: userInfo
    }
};



// Reducer Function 

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case INCREMENT_CLICK:
            return {...state, click_balance: action.payload}
        case SET_INITIAL_STATE: 
            return {...state, click_balance: action.payload.click_balance, email: action.payload.email, user_id: action.payload.user_id}
        default: 
            return state; 
    }
};