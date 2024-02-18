import React, { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

const WalletConnect = ({ setWeb3 }) => {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const connectWallet = async () => {
            const provider = await detectEthereumProvider();
            if (provider) {
                const web3 = new Web3(provider);
                setWeb3(web3);
                const accounts = await web3.eth.requestAccounts();
                setAccount(accounts[0]);
                provider.on('accountsChanged', (accounts) => setAccount(accounts[0]));
            } else {
                console.error('Please install MetaMask!');
            }
        };

        connectWallet();
    }, [setWeb3]);

    return <div>Account: {account ? account : 'Not connected'}</div>;
};

export default WalletConnect;
