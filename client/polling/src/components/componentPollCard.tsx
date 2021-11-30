import React, { useEffect, useState } from "react";
import Button from "./componentButton";
import { useParams } from "react-router-dom";
import { useWeb3React } from "@web3-react/core"
import { NFTPOLL_ABI } from "../config";
import Web3 from 'web3';
import voteTransition from "../functions/voteTransition";

type props = {
    image: string;
    id: number;
    tokenAddress: string;
    contractAddress: string;
    voteCount: any;
};

const PollCard: React.FC<props> = (props) => {
    const { image, id , tokenAddress, contractAddress, voteCount} = props;
    const [buyerAddress, setBuyerAddress] = useState<string>("");
    const [pollResponse, setPollResponse] = useState<string>("");
    let {
        library,
        active,
        account} = useWeb3React();

    const applyVote = () => {
        if(!active) return;
        const web3 = new Web3(library);
        let contract = new library.eth.Contract(NFTPOLL_ABI as any, contractAddress, account);
        voteTransition(contract, account, web3, tokenAddress, id);
    }
    return ( <div className="container bg-gray-100 mx-auto px-4 lg:px-2 pb-20">
        <div className="pt-5 pb-10">
        </div>
        <div className="grid lg:grid-cols-3 gap-12 relative">
            <div className="order-2 lg:order-none lg:col-span-2">
                <img
                    className="rounded-xl bg-gray-100"
                    src={image}
                />
            </div>

            <div className="order-1">
                <div className="top-32 p-6  w-full">
                {tokenAddress ? <Button
                        modal
                        onClick={applyVote}
                        text="Vote!"
                    /> : <h1 className="text-gray-900 text-3xl font-medium">
                         Votes : {voteCount}
                    </h1>}
                </div>
            </div>
        </div>
    </div>


    );
};

export default PollCard;
