# nft-pop
https://shirishkulkarni.github.io/listings \
# Screencast: part1: https://www.loom.com/share/bc78588212cb40078477dd490b056bc1
#              part2: https://www.loom.com/share/1420fc94e7844d41ba6dd6cc95050ec4
# Discord: shirishkulk
# NFT Collectible with Popularity Voting

This project is a National Monuments Access Pass NFT Collectible smart contract where you can mint NFTs as a representation of lifetime Access Pass for that National Monuments.
Once the NFTs are minted, there is a capability to setup the voting among NFTs to validate the popularity of any NFT. This Smart Contract has capability to run a popularity vote
not only among minted NFT's from this Smart Contract, but also from any other smart contract.

## UI Features
- Login with Metamask.
- List Your NFT tokens, all other NFT tokens & NFT tokens available for Voting.
- SetupVoting among all NFTs from the list for popularity.


## Monuments NFT Collectible SmartContract Features (All features are not implemented in UI)
- Mint, or Burn Non-Fungible Tokens(NFT).
- Approve - Assign spender approval for enabling TransferFrom functionality. To approve or remove spender approval for a given NFT token.
- setApprovalForAll - To set or unset an operator for any given token owner.

DEPLOYED in Ropsten @ `0xe29E447a054DB13d2d22583C345A1C70A2a3f699`

## NFT Most Popular Poll SmartContract Features (All features are not implemented in UI)
- createNewPoll - To setup the base for voting by deploying a NFTPOLL contract using the NFTPOLL Factory.
- vote - Vote for an NFT Token and open anyone to vote for popularity.
- endPoll - Ending the poll after certain number of days.
- Setup polls among NFTs and open anyone to vote for popularity
- Show top 3 most popular NFTs . This popularity can be used to increase the value of the NFT.

DEPLOYED in Ropsten @ `0x74a180B9280CDc2006b2B3E4ECaC9753E9503AFB`

# Getting Started

### Prerequisites
 - Node.js >= v14
 - Truffle and Ganache
 - Yarn
 - git checkout master

## Contracts
  - Run yarn install in project root to install Truffle build and smart contract dependencies
  - Run local testnet in port 7545 with an Ethereum client, e.g. Ganache
  - truffle migrate --network development
  - truffle console --network development
  - Run tests in Truffle console: test
  - development network id is 1337, remember to change it in Metamask as well!

## Frontend
  - cd client/polling
  - npm install
  - npm start
  - Open http://localhost:3000/listings

## The Technology

- [Create React App](https://github.com/facebook/create-react-app) for the frontend.
- [Tailwind CSS](https://tailwindcss.com) for styling.
- [Ethereum](https://ethereum.org/en/) blockchain technology.
- [Openzepplin](https://openzeppelin.com/) for base contracts


## Directory structure

- `client`: Project's React frontend.
- `contracts`: Smart contracts that are deployed in the Ropsten testnet.
- `migrations`: Migration files for deploying contracts in `contracts` directory.
- `test`: Tests for smart contracts.

## Steps to run the project

cd client/polling (From Base directory)
- ***Download dependencies :*** \
  `npm install`

- Note: May need to separately install the below components additionally: \
  `npm install -g tailwind` \
  `npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`

- ***Start Project : Development *** \
  `npm start` Runs the app in the development mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.\
  You will also see any lint errors in the console.


- ***Build Project : Production ***
  `npm build`
  Builds the app for production to the `build` folder.
  It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.\
  Your app is ready to be deployed!


## Metamask Wallet details for Minting NFT and setting up the Poll: (Please import this to Metamask)
Ropsten Metamask Account (Final deployed project) \
Public address - 0x4F32Dbc5A984dd6525bd7896e54e14389F3EaE27 \  

## Simple workflow

1. Enter the web site
2. Login with Metamask
3. Browse your NFTs and any polls listed
4. Click on "Create a token" (NFT)
5. Copy an image URL from Google Images for a National Monument and paste the image URL and click "Mint!") (Smart contract call - Invoke safeMint in NationalMonumentNFT SmartContract)
6. Sign the transaction with the Metamask in Ropsten test network using the below provided Wallet Address which is the Owner of the SmartContract who has the access for Minting.
7. You will see the new NFT token under "Your Tokens" listing (Refresh if needed). (Smart contract call - Fetched from the NationalMonumentNFT SmartContract)
8. Now Click on the  "Start Poll" listing.Sign with MetaMask. A new poll smart contract is created in the backend with all the minted tokens. A poll icon will show up on front end.(SmartContract call to another contract "NFTPOLLFactory". This will internally deploy a separate Contract called "NFTPOLL" which will be the specific smart contract to this poll)
9. Vote for the NFT which you like the most. We can vote only for one NFT, multiple voting is not allowed. Sign with MetaMask for cast yor vote. (Yes, its impractical to vote and pay for your vote, wanted to implement META-TRANSACTIONS here so that contract owner could bear the voting cost. Was not able to due to time constraints.)
10.After the voting has been period has been complete, click on "ENDPOLL" (smart contract call - this would complete the poll and declare the top 3 winners with most number of votes ).



## Public Ethereum wallet for certification as NFT:
0x5144d13B1F50225067D353b26de50f241bE10e89  

