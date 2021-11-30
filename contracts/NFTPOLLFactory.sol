
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;
import "./SkyScrapperNFT.sol";

contract NFTPOLLFactory {
    address[] public nftPolls;

    function getPollAddress(uint id) public view returns(address pollContractAddress) {
        return nftPolls[id];
    }

    function getAllOngoingPolls() public view returns(address[] memory polls) {
        return nftPolls;
    }

    // deploy a new contract
    function createNewPoll(uint _days) public returns (address  newContract)
    {
        NFTPOLL poll = new NFTPOLL(_days);
        nftPolls.push(address(poll));
        return address(poll);
    }
}




contract NFTPOLL {

    /**
    * STATE VARIABLES
    **/
    Item[] public tokensInPoll;
    Item[] public winners;
    bool public isRegistrationComplete;
    bool public isVotingComplete;
    bool public isVotingStarted;
    mapping (address => bool) public votedAddresses;
    uint public votingEndBlockTimeStamp;


    struct Item {
        address nftAddr;
        uint tokenId;
        uint voteCount;
        string uri;
    }


    //constructor
    constructor(uint _days) {
        isVotingStarted = true;
        votingEndBlockTimeStamp = block.timestamp + _days * 1 minutes;
        emit VotingStarted();
    }

    /**
    NFT POLL IMplementation functions
    **/

    /**
    * EVENTS
    **/
    event RegistrationForPollStarted();

    event RegistrationForPollCompleted();

    event VotingStarted();

    event VotingCompleted();

    event Vote(address _voter, uint _tokenId);

    event VotingFailed(address _voter, uint _tokenId, string _message);

    event RegisterItemForPoll(address _contestant_addr, uint _tokenId);

    event PollWinner(uint _tokenId, address _winner_addr,uint _total_votes);

    event Winners(Item[] winners);




    /*
     * Modifiers
 */
    modifier RegistrationComplete() {
        require(isRegistrationComplete == false,"Registration is Complete. Can not register now. Next Poll is coming up soon");
        _;
    }



    modifier RegisterUniqueToken(address nft_addr, uint _tokenId) {
        uint j;
        bool isTokenAlreadyRegistered;
        while (j <= tokensInPoll.length) {
            // find the token in contested NFT list
            if(tokensInPoll[j].nftAddr == nft_addr && tokensInPoll[j].tokenId == _tokenId) {
                isTokenAlreadyRegistered=true;
                break;
            }
            j++;
        }
        require(isTokenAlreadyRegistered == false,"This token is already Registered.");
        _;
    }

    modifier VotingComplete() {
        require(block.timestamp < votingEndBlockTimeStamp,"Voting is Complete. Can not Vote now.");
        _;
    }

    modifier UniqueVoter(address voter_addr) {
        require(votedAddresses[voter_addr] == false,"Voter already voted.");
        _;
    }



    /*
     * Functions



    function registerItemForPoll(address nft_addr, uint _tokenId)  RegistrationComplete RegisterUniqueToken(nft_addr,_tokenId) public returns (bool) {
        tokensInPoll.push(Item({nftAddr:nft_addr, tokenId:_tokenId, voteCount:0}));
        emit RegisterItemForPoll(msg.sender, _tokenId);
        return true;
    }

    function completeRegistrationForPoll() public {
        isRegistrationComplete = true;
        emit RegistrationForPollCompleted();
    }*/

    function registerItemForPoll(address nft_addr, uint _tokenId)   public returns (bool) {
        _uri =
        tokensInPoll.push(Item({nftAddr:nft_addr, tokenId:_tokenId, voteCount:0, uri:_uri}));
        emit RegisterItemForPoll(msg.sender, _tokenId);
        return true;
    }

    function endPolling() public {
        isVotingComplete = true;
        emit VotingCompleted();
    }

    function vote(address _nft_addr, uint _tokenId) public VotingComplete UniqueVoter(msg.sender) returns (bool) {

        uint j;
        bool votingSuccess= false;
        // loop thru Array and increment the vote count
        while (j <= tokensInPoll.length) {
            // find the token in contested NFT list
            if(tokensInPoll[j].nftAddr == _nft_addr && tokensInPoll[j].tokenId == _tokenId) {
                //increment voteCount
                uint votes = tokensInPoll[j].voteCount;
                votes += 1;
                tokensInPoll[j].voteCount = votes;
                votingSuccess = true;
                votedAddresses[msg.sender]=true;
                break;
            }
            j++;
        }
        if(votingSuccess){
            emit Vote(msg.sender, _tokenId);
            return true;
        }
        else{
            emit VotingFailed(msg.sender, _tokenId," TOKEN NOT IN POLLING LIST");
            revert();

        }
    }


    function endPoll() public returns (uint) {
        uint maxVotes;
        uint tokenId;
        address addr;
        for (uint i=0; i<tokensInPoll.length; i++) {
            if(maxVotes < tokensInPoll[i].voteCount){
                maxVotes = tokensInPoll[i].voteCount;
                tokenId = tokensInPoll[i].tokenId;
                addr = tokensInPoll[i].nftAddr;
            }
        }
        emit PollWinner(maxVotes, addr, tokenId);
        return tokenId;
    }

    function getPollResults() public returns (Item[] memory) {
        quickSort(tokensInPoll, int(0), int(tokensInPoll.length - 1));
        winners.push(tokensInPoll[tokensInPoll.length-1]);
        winners.push(tokensInPoll[tokensInPoll.length-2]);
        winners.push(tokensInPoll[tokensInPoll.length-3]);
        emit Winners(winners);
        return winners;
    }


    function quickSort(Item[] memory arr, int left, int right) internal{
        int i = left;
        int j = right;
        if(i==j) return;
        uint pivot = arr[uint(left + (right - left) / 2)].voteCount;
        while (i <= j) {
            while (arr[uint(i)].voteCount < pivot) i++;
            while (pivot < arr[uint(j)].voteCount) j--;
            if (i <= j) {
                (arr[uint(i)], arr[uint(j)]) = (arr[uint(j)], arr[uint(i)]);
                i++;
                j--;
            }
        }
        if (left < j)
            quickSort(arr, left, j);
        if (i < right)
            quickSort(arr, i, right);
    }

    function getAllItemsInPoll() public view returns(Item[] items){
        return tokensInPoll;
    }

}
