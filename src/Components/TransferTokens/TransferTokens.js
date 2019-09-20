import React, { Component } from 'react';

export default class TransferTokens extends Component {

    transferTokens = () => {
        const { abi, contract_address, address } = this.props; 
        const contract = window.web3.eth.contract(abi).at(contract_address);
        // contract.balanceOf.call();
        // window.ethereum.sendAsync({
        //     method: 'transfer', 
        //     params: transactionParameters, 
        //     from: window.ethereum.selectedAddress 
        // }, (err, res) => {
        //     console.log(res)
        // })
    };

    render() {
        return (
            <div>
                {/* This is the interface for transfering the tokens out of MM
                Display eth and token balance  */}
            </div>
        )
    }
};
