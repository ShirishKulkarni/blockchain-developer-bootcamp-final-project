# Design patterns used

## Access Control Design Patterns

- `Ownable` design pattern used in the following functions: `safeMint()`. These functions do not need to be used by anyone else apart from the contract creator . 

- The following functions are restricted 
    - `vote()` can only be called only once and cannot be called once poll is completed.

## Inheritence and Interfaces

- The `NationalMonumentNFT` contract inherits from Open Zeppelin `Ownable.sol`

## Factory Design Pattern

- Individual `NFTPOLL` contracts be deployed by using the `NFTPOLLFactory` contract.

## Commit Reveal Design Pattern

- The contract uses a commit-reveal design pattern to keep the commited votes secret until they are finally revealed after polling completion.
