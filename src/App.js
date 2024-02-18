import React, { useState, useEffect } from 'react';
import './App.css';
import WalletConnect from './components/WalletConnect';
import useContract from './utils/useContract';
import Proposals from './components/Proposals';

function App() {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const contract = useContract(web3);

    useEffect(() => {
        const getAccount = async () => {
            if (web3) {
                const accounts = await web3.eth.getAccounts();
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                }
            }
        };
        getAccount();
    }, [web3]);


    return (
        <div className="App">
            <header className="App-header">
                <WalletConnect setWeb3={setWeb3} />
                {contract && account && (
                    <Proposals contract={contract} account={account} />
                )}
            </header>
        </div>
    );
}

export default App;
