import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ContextContainer from "../functions/contextContainer";
import formatListings from "../functions/formatListings";
import getCurrentEpochNumber from "../functions/getCurrentEpochNumber";
import getCurrentUser from "../functions/getCurretUser";
import Button from "./componentButton";
import CreateListingModal from "./componentCreateListingModal";
import ListingCard from "./componentListingCard";
import ManageListingModal from "./componentManageListingModal";
import PollCard from "./componentPollCard";
import { NFTPOLL_ABI } from "../config";
import Web3 from 'web3';
import pollImagesTransition from "../functions/pollImagesTransition";
import { useWeb3React } from "@web3-react/core"
import { useParams } from "react-router-dom";


const Poll: React.FC = () => {
    const [showCreateListing, setShowCreateListing] = useState<boolean>(false);
    const [showManageListing, setShowManageListing] = useState<boolean>(false);
    const [modalListing, setModalListing] = useState<any | undefined>(
        undefined
    );
    const [listings, setListings] = useState<any | undefined>(undefined);
    const [count, setCount] = useState<any | undefined>(0);
    let {
        library,
        active,
        account } = useWeb3React();
    const { id } = useParams<{ id: string }>();


    useEffect(() => {
        if(!active) return;
        (async () => {
            const web3Ref = new Web3(library);
            let contract = new library.eth.Contract(NFTPOLL_ABI as any, id, account);
            pollImagesTransition(contract,account,web3Ref).then(value => setListings(value));
        })();
    }, [active]);

    return (
        <div className="container mx-auto px-4 lg:px-2 pb-10">
            <div className="pt-10 pb-5 flex justify-between items-center">
                <h1 className="text-gray-900 text-2xl font-medium">Poll</h1>
            </div>
                    {listings && listings.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-1 gap-10">
                                {listings.map((listing: any, index: number) => {
                                    return (
                                        <PollCard
                                            {...listing}
                                        />
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <p className="text-xl text-center">No listings</p>
                    )}
        </div>
    );
};

export default Poll;
