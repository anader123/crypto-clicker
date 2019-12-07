import React from 'react';
import { useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom'; 

export default function AccountInfo(props) {
    const { metaMaskConnected } = props; 
    const address = useSelector(state => state.address);
    const contract_address = useSelector(state => state.contract_address); 
    const token_balance = useSelector(state => state.token_balance); 
    const network = useSelector(state => state.network); 
    const email = useSelector (state => state.email); 
    return (
        <div>
            {!metaMaskConnected 
            ?
            (<div className='network-container'>
                <p className='network-warning-text'>*Please make sure that you are connected to the 
                    <Link to='/about' className='ropsten-info-text'>Ropsten Network</Link>
                </p>

                <h3>Email: $ {email}</h3>
            </div>)
            :
            (<div className='network-container'>
                <p className='network-warning-text'>*Please make sure that you are connected to the 
                    <Link to='/about' className='ropsten-info-text'>Ropsten Network</Link>
                </p>
                
                <div className='user-eth-info'>
                    <h3>Email: $ {email}</h3>

                    <h3>Network: {network}</h3>
    
                    <h3>Token Contract: 
                        <a target="_blank" 
                            rel="noopener noreferrer" 
                            href={`https://ropsten.etherscan.io/token/${contract_address}`}>{contract_address}
                        </a>
                    </h3>

                    <h3>User Address: 
                        <a target="_blank" 
                            rel="noopener noreferrer" 
                            href={`https://ropsten.etherscan.io/address/${address}`}>{address}
                        </a>
                    </h3>

                    <h3>Token Balance: {token_balance}</h3>
                </div>
            </div>)
            }
        </div>
    )
}
