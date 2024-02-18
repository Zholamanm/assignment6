import React, {useState, useEffect, useCallback} from 'react';
import Web3 from "web3";

function Proposals({contract, account}) {
    const [events, setEvents] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [newProposal, setNewProposal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [members, setMembers] = useState([]);
    const [newMember, setNewMember] = useState('');

    const fetchProposals = useCallback(async () => {
        if (!contract) return;
        setIsLoading(true);
        try {
            const proposalsArray = [];
            const membersArray = [];
            let index = 0;
            while (true) {
                try {
                    const members = await contract.methods.members(index).call();
                    const proposal = await contract.methods.proposals(index).call();
                    proposalsArray.push(proposal);
                    membersArray.push(members);
                    index++;
                } catch (error) {
                    console.log("No more proposals to fetch at index", index);
                    break;
                }
            }
            setMembers(membersArray);
            setProposals(proposalsArray);
            setError(null);
        } catch (error) {
            console.error("Error fetching proposals:", error);
            setError("Failed to fetch proposals. Please try again later.");
        }
        setIsLoading(false);
    }, [contract]);


    useEffect(() => {
        fetchProposals();
    }, [fetchProposals, contract]);

    useEffect(() => {
        fetchProposals();
    }, [contract]);

    const submitProposal = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await contract.methods.createProposal(newProposal).send({from: account});
            setNewProposal('');
            alert('Proposal submitted successfully!');
            await fetchProposals();
        } catch (error) {
            alert('Failed to submit proposal. Error: ' + error.message);
        }
        setIsLoading(false);
    };

    const voteOnProposal = async (proposalId) => {
        setIsLoading(true);
        try {
            await contract.methods.vote(proposalId, 1).send({from: account});
            alert('Vote successful!');
            await fetchProposals();
        } catch (error) {
            alert('Voting failed. Error: ' + error.message);
        }
        setIsLoading(false);
    };

    const addMember = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {

            await contract.methods.addMember(newMember).send({from: account});
            alert('Member added successfully!');
            setNewMember('');
            await fetchProposals();
        } catch (error) {
            alert('Failed to add member. Error: ' + error.message);
        }
        setIsLoading(false);
    };

    const removeMember = async () => {
        setIsLoading(true);
        try {
            await contract.methods.removeMember(account).send({from: account});
            alert('Member removed successfully!');
            await fetchProposals();
        } catch (error) {
            alert('Failed to remove member. Error: ' + error.message);
        }
        setIsLoading(false);
    };

    const executeProposal = async (proposalId) => {
        setIsLoading(true);
        try {
            await contract.methods.executeProposal(proposalId).send({from: account});
            alert('Proposal executed successfully!');
            await fetchProposals();
        } catch (error) {
            alert('Failed to execute proposal. Error: ' + error.message);
        }
        setIsLoading(false);
    };

    const fetchAllEvents = async () => {
        if (!contract) return;
        setIsLoading(true);
        try {
            const eventsArray = []
            const events = await contract.getPastEvents('allEvents', {
                fromBlock: 0,
                toBlock: 'latest'
            });
            console.log("Fetched events:", members);
            events.forEach(event => {
                eventsArray.push(event);
            });
            setEvents(eventsArray);
        } catch (error) {
            console.error("Error fetching historical events:", error);
            setError("Failed to fetch historical events. Please try again later.");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAllEvents();
    }, [contract]);

    return (
        <div>
            <h2>Proposals</h2>
            {error && <p>{error}</p>}
            {isLoading ? <p>Loading proposals...</p> : proposals.map((proposal, index) => (
                <div key={index}>
                    <p>{proposal.description}</p>
                    <p>Votes: {proposal.voteCount}</p>
                    <button onClick={() => voteOnProposal(index)}>Vote</button>
                    <button onClick={() => executeProposal(index)}>Execute Proposal</button>
                </div>
            ))}
            {members.map((member, index) => (
                <div key={index}>
                    <p>{member.memberAddress}</p>
                    <p>Member Since: {member.memberSince}</p>
                    <p>Token Balance: {member.tokenBalance}</p>
                </div>
            ))}
            <form onSubmit={submitProposal}>
                <input
                    type="text"
                    value={newProposal}
                    onChange={(e) => setNewProposal(e.target.value)}
                    placeholder="New Proposal Description"
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>Submit Proposal</button>
            </form>
            <form onSubmit={addMember}>
                <input
                    type="text"
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                    placeholder="New Member Address"
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !Web3.utils.isAddress(newMember)}>Add Member</button>
            </form>
            <button onClick={removeMember}>Remove Member</button>
            <div>
                <h2>Events</h2>
                {events.map((event, index) => (


                    <div>
                        <p>Event Type: {event.event}</p>
                        <p>Event Address: {event.address}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Proposals;
