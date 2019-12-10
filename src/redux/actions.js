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

// Action Builders 
export function setInitialState(userInfo) {
    return {
        type: SET_INITIAL_STATE, 
        payload: userInfo
    }
};

// Sets the addresss from MetaMask equal to the address property in redux. 
export function setAddress(address) {
    return {
        type: SET_ADDRESS, 
        payload: address
    }
};

// Sets the token balance from an axios call to the redux state. 
export function setTokenBalance(balance) {
    return {
        type: SET_TOKEN_BALANCE, 
        payload: balance
    }
}

// Sets the network selected in MetaMask equal to the nework property in redux. 
export function setNetwork(network) {
    return {
        type: SET_NETWORK, 
        payload: network
    }
};

// Manages the coniditonal rendering for the Connect MetaMask button. 
export function setMetaMask(bool) {
    return {
        type: SET_METAMASK, 
        payload: bool
    }
}

// Increases click_balance when the user clicks the Eth logo in the Eth clicker component. 
export function incrementClick(click_balance) {
    return {
        type: INCREMENT_CLICK,
        payload: ++click_balance
    }
};
 
// Resets the click_balance in redux to 0 when the user tokenizes their clicks. 
export function resetCount() {
    return {
        type: RESET_COUNT, 
    }
};

export function toggleTokenTransfer(bool) {
    return {
        type: TOGGLE_TOKEN_TRANSFER, 
        payload: bool
    }
}

export function setWeb3(web3) {
    return {
        type: SET_WEB3,
        payload: web3
    }
}
