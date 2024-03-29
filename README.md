**Mood Diary Blockchain Application**
This repository contains the source code for a decentralized application (DApp) called Mood Diary. Mood Diary is a simple blockchain application built using Ethereum smart contracts. It allows users to create proposals, vote on them, and execute proposals based on the voting results.

**Components**
The application consists of the following components:

**WalletConnect**: This component enables users to connect their Ethereum wallet (e.g., MetaMask) to the application. It utilizes the @metamask/detect-provider package to detect the presence of a wallet provider and prompts the user to connect if one is available.

**Proposals**: This component allows users to view existing proposals, submit new proposals, vote on proposals, add or remove members, and execute proposals based on the voting outcomes.

**useContract**: This custom hook provides a simple interface for interacting with the deployed MoodDiary smart contract. It initializes the contract instance using the Web3 library and the MoodDiary ABI (Application Binary Interface).

**App**: This is the main entry point of the application. It renders the WalletConnect component to connect the user's wallet and then displays the Proposals component to interact with the Mood Diary smart contract.

**Smart Contract**
The Mood Diary smart contract is written in Solidity and deployed on the Ethereum blockchain. It includes the following functionalities:

Adding and Removing Members: Users can add new members to the Mood Diary organization or remove existing members. Each member is associated with an Ethereum address, registration date, and token balance.

**Creating Proposals**: Members can create new proposals by providing a description of the proposal. These proposals are stored on the blockchain and can be voted on by members.

**Voting on Proposals**: Members can vote on proposals by spending their allocated tokens. Each member's token balance decreases when they vote on a proposal.

**Executing Proposals**: Once a proposal receives enough votes (more than 50% of the total supply), it can be executed. Executing a proposal triggers a specific action or outcome defined in the proposal.

**How to Run**
To run the Mood Diary application locally, follow these steps:

- Clone this repository to your local machine.
- Install dependencies using npm install.
- Start the development server using npm start.
- Open your web browser and navigate to http://localhost:3000.
- Ensure that you have an Ethereum wallet (e.g., MetaMask) installed in your browser and connected to the appropriate network (e.g., Rinkeby, Ropsten) to interact with the application.

**Smart Contract Address and ABI**
The smart contract address and ABI (Application Binary Interface) used in this application are as follows:

Address: 0x62FF0F8Bf13510dA8714d5AdCf0490222e3fB1fF
ABI: MoodDiaryABI.json
You can deploy the smart contract on your preferred Ethereum network and update the contract address and ABI accordingly in the application code.

