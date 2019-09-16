const initialState = {
    click_balance: 0, 
    email: '',
    user_id: 0, 
    address: null,
    network: null, 
    metaMaskConnected: false,
}; 

//Action Types 
const INCREMENT_CLICK = 'INCREMENT_CLICK';
const SET_INITIAL_STATE = 'SET_INITIAL_STATE'; 
const RESET_COUNT = 'RESET_COUNT';
const SET_ADDRESS = 'SET_ADDRESS'; 
const SET_NETWORK = 'SET_NETWORK'; 
const SET_METAMASK = 'SET_METAMASK';

// TODO: 
// change these to arrow functions 

// Action Builders 
export function setInitialState(userInfo) {
    return {
        type: SET_INITIAL_STATE, 
        payload: userInfo
    }
};

// Also handles conditional rendering for metamask view. 
export function setAddress(address) {
    return {
        type: SET_ADDRESS, 
        payload: address
    }
};

export function setNetwork(network) {
    return {
        type: SET_NETWORK, 
        payload: network
    }
};

export function setMetaMask(bool) {
    return {
        type: SET_METAMASK, 
        payload: bool
    }
}

export function incrementClick(click_balance) {
    return {
        type: INCREMENT_CLICK,
        payload: ++click_balance
    }
};

export function resetCount() {
    return {
        type: RESET_COUNT, 
    }
};


// Reducer Function 

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_INITIAL_STATE: 
            return {...state, click_balance: action.payload.click_balance, email: action.payload.email, user_id: action.payload.user_id}
        case SET_ADDRESS: 
            return {...state, address: action.payload}
        case SET_METAMASK: 
            return {...state, metaMaskConnected: action.payload}
        case SET_NETWORK:
            return {...state, network: action.payload}   
        case INCREMENT_CLICK:
            return {...state, click_balance: action.payload}
        case RESET_COUNT: 
            return {...state, click_balance: 0}
        default: 
            return state; 
    }
};