// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts@4.4.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.4.0/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts@4.4.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.4.0/utils/Counters.sol";

contract CosmoToken is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct CosmoTokenStruct {
        uint256 tokenId;
        string tokenUri;
        int royaltyType;
        int royaltyPercent;
        int price;
        address owner;
    }

    CosmoTokenStruct[] private tokens;

    constructor() ERC721("CosmoToken", "NCOS") {}

    function safeMint(address to, string memory uri, int royaltyType, int royaltyPercent, int price) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        CosmoTokenStruct memory token = CosmoTokenStruct({
            tokenId : tokenId,
            tokenUri : uri,
            royaltyType : royaltyType,
            royaltyPercent : royaltyPercent,
            price : price,
            owner : to
        });
        tokens.push(token);
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
        delete tokens[tokenId];
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    //function to get all the tokens
    function getTokenUris() public view returns(CosmoTokenStruct[] memory){
        return tokens;
    }



}
