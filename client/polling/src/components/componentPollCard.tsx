import React, { useEffect, useState } from "react";
import Button from "./componentButton";
import { useParams } from "react-router-dom";
import { useWeb3React } from "@web3-react/core"
import { NFTPOLL_ABI } from "../config";
import Web3 from 'web3';
import pollImagesTransition from "../functions/pollImagesTransition";

type props = {
    image: string;
    id: number
};

const PollCard: React.FC<props> = (props) => {
    const { image, id } = props;
    const [buyerAddress, setBuyerAddress] = useState<string>("");
    const [pollResponse, setPollResponse] = useState<string>("");

    const applyVote = () => {

    }

    return ( <div className="container bg-gray-100 mx-auto px-4 lg:px-2 pb-20">
        <div className="pt-20 pb-10">
            <h1 className="text-gray-900 text-3xl font-medium">
            {id}
            </h1>
        </div>
        <div className="grid lg:grid-cols-3 gap-12 relative">
            <div className="order-2 lg:order-none lg:col-span-2">
                <img
                    className="rounded-xl bg-gray-100"
                    src="https://uni-span.com.au/wp-content/uploads/2018/02/2_Blog_UniSpan.jpeg"
                />
            </div>

            <div className="order-1">
                <div className="sticky top-32 p-6  border-2 w-full">
                    <Button
                        modal
                        onClick={applyVote}
                        text="Vote!"
                    />
                </div>
            </div>
        </div>
    </div>


    );
};

export default PollCard;
