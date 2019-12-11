import swal from '@sweetalert/with-react';
import React from 'react';

// Images 
import blockLoad from '../img/green-blockchainLoading.png';

export const ethWalletRequired = () => {
    return swal({
                icon: "warning",
                title: "Ethereum Wallet Required",
                timer: 23000,
                content: (<div>
                    <p>Please download the MetaMask Chrome extension.</p>
                    <br/> 
                    <p>If you just now downloaded the extension, please refresh the page.</p>
                </div>)
            });
}

export const metaMaskConnectedAlert = (response) => {
    return swal({
                icon: false,
                title: "Wallet Connected",
                timer: 150000,
                content: (<div>
                    <p>Address:</p><br/><p>{`${response[0]}`}</p>
                </div>)
            });
}

export const accountDeletedSuccessAlert = () => {
    return swal({
                icon: "success",
                title: "Account Deleted",
                timer: 15000,
                text: `Your account has been deleted.`
            });
}

export const incorrectPasswordAlert = () => {
    return swal({
                icon: "error",
                title: "Incorrect Password",
                timer: 15000,
                text: `Please make sure that you are entering the corret password.`
            });
}

export const clickingSpeedAlert = () => {
    return swal({
                icon: "warning",
                title: "Slow Clicking Speed",
                closeOnClickOutside: false,
                text: "It appears that you are clicking too fast."
            });
}

export const blockchainLoadingAlert = () => {
    return swal({
                closeOnClickOutside: false,
                button: false, 
                content: (<div>
                    <img className='block-load-img' src={blockLoad} alt='block loading'/>
                    <p>Blockchain magic in progress...</p>
                    <br/>
                    <p>*Do not refresh page</p>
                    <br/>
                </div>)
                });
}

export const tokensSuccessfullyExchangedAlert = (response) => {
    return swal({
                icon: "success",
                title: "Clicks Successfully Exchanged",
                closeOnClickOutside: false,
                content: ( 
                <div>
                    <p>Transaction Hash:</p>
                    <br/>
                    {/* response.data is the transaction hash */}
                    <p><a target="_blank" rel="noopener noreferrer" href={`https://ropsten.etherscan.io/tx/${response.data}`}>{response.data}</a></p>
                </div>)
            });
}

export const tokensExchangedErorrAlert = () => {
    return swal({
                icon: "error",
                title: "Tokenization Error",
                timer: 20000,
                text: `You must have at least 50 clicks before being able to tokenzie.`
            });
}

export const registraionErrorAlert = () => {
    return swal({
                icon: "error",
                title: "Registration Error",
                timer: 15000,
                text: `Please make sure that you entering in a valid email and that your password is at least 5 characters long.`
            });
}

export const loginErorrAlert = () => {
    return swal({
                icon: "error",
                title: "Login Error",
                timer: 15000,
                text: `Invalid Credentials: Please make sure that you entering in the correct email and password.`
            });
}

export const tokenTransferSuccessAlert = (response) => {
    return swal({
                icon: "success",
                title: "Tokens Successfully Sent",
                closeOnClickOutside: false,
                content: (
                    <div>
                        <p>Transaction Hash:</p>
                        <br/>
                        {/* response is the transaction hash */}
                        <p><a target="_blank" rel="noopener noreferrer" href={`https://ropsten.etherscan.io/tx/${response}`}>{response}</a></p>
                    </div>)
            });
}

export const tokenTransferErorrAlert = () => {
    return swal({
                icon: "error",
                title: "Error Transferring Tokens",
                closeOnClickOutside: false,
            });
}

export const tokenAddressErorrAlert = () => {
    return swal({
                icon: "error",
                title: "Address Error",
                timer: 20000,
                text: `Please make sure that you are entering in a valid Ethereum address.`
            });
}

export const tokenAmountErrorAlert = () => {
    return swal({
                icon: "error",
                title: "Amount Error",
                timer: 20000,
                text: `Please make sure that you are entering in a valid token amount.`
            });
}

export const networkErrorAlert = () => {
    return swal({
            icon: "error",
            title: "Network Error",
            text: "Please switch to the Ropsten Test Network"
        })
}