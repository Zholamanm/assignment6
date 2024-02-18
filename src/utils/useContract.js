import { useEffect, useState } from 'react';
import MoodDiaryABI from '../contracts/MoodDiaryABI.json';

const contractAddress = '0x62FF0F8Bf13510dA8714d5AdCf0490222e3fB1fF';

const useContract = (web3) => {
    const [contract, setContract] = useState(null);

    useEffect(() => {
        if (web3) {
            const moodDiaryContract = new web3.eth.Contract(MoodDiaryABI, contractAddress);
            setContract(moodDiaryContract);
        }
    }, [web3]);

    return contract;
};


export default useContract;