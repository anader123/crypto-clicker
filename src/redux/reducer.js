import contractAbi from '../utils/contractAbi'; 
const initialState = {
    click_balance: 0, 
    token_balance: null,
    email: '',
    web3: {},
    user_id: 0, 
    address: null,
    network: null, 
    metaMaskConnected: false,
    contract_address: '0x264A0131376cdD61EF0Ab11Cf0Ca3cC9F3f7548C',
    abi: contractAbi.abi, 
    transfer_toggle: false
}; 

//Action Types 
const INCREMENT_CLICK = 'INCREMENT_CLICK';
const SET_INITIAL_STATE = 'SET_INITIAL_STATE'; 
const RESET_COUNT = 'RESET_COUNT';
const SET_ADDRESS = 'SET_ADDRESS'; 
const SET_NETWORK = 'SET_NETWORK'; 
const SET_METAMASK = 'SET_METAMASK';
const SET_TOKEN_BALANCE = 'SET_TOKEN_BALANCE';
const TOGGLE_TOKEN_TRANSFER = 'TOGGLE_TOKEN_TRANSFER';
const SET_WEB3 = 'SET_WEB3';



// Reducer Function 
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_INITIAL_STATE: 
            return {...state, click_balance: action.payload.click_balance, email: action.payload.email, user_id: action.payload.user_id}
        case SET_ADDRESS: 
            return {...state, address: action.payload}
        case SET_TOKEN_BALANCE: 
            return {...state, token_balance: action.payload}
        case SET_METAMASK: 
            return {...state, metaMaskConnected: action.payload}
        case SET_NETWORK:
            return {...state, network: action.payload}   
        case INCREMENT_CLICK:
            return {...state, click_balance: action.payload}
        case RESET_COUNT: 
            return {...state, click_balance: 0}
        case TOGGLE_TOKEN_TRANSFER: 
            return {...state, transfer_toggle: action.payload}
        case SET_WEB3: 
            return {...state, web3: action.payload}
        default:
            return state; 
    }
};