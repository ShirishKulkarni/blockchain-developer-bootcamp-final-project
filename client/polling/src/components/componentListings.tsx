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
import ImageGrid from "./componentImageGrid";
import { useWeb3React  } from "@web3-react/core"
import { NFTCOSMOS_ABI, NFTCOSMOS_ADDRESS, NFTPOLLFACTORY_ABI, NFTPOLLFACTORY_ADDRESS } from "../config";
import startPollTransition from '../functions/startPollTransition';
import Web3 from 'web3'



const Listings: React.FC = (props) => {
    const [showCreateListing, setShowCreateListing] = useState<boolean>(false);
    const [showManageListing, setShowManageListing] = useState<boolean>(false);
    const [modalListing, setModalListing] = useState<any | undefined>(
        undefined
    );
    const [listings, setListings] = useState<any | undefined>(undefined);
    const history = useHistory();
    const {contract} = ContextContainer.useContainer();
    let {
    library,
    active,
    account} = useWeb3React();

    const polls = listings?.filter((listing: any) => {
        return !listing.isPoll;
    });

    const nonPolls = listings?.filter((listing: any) => {
        return listing.isPoll;
    });


    const startPoll = () => {
        if(!active) return;
        const web3 = new Web3(library);
        let contract = new library.eth.Contract(NFTPOLLFACTORY_ABI as any, NFTPOLLFACTORY_ADDRESS, account);
        const ids = listings.filter((element:any) => !element.isPoll).map((element:any) => element.id);
        const addresses = listings.filter((element:any) => !element.isPoll).map(() => NFTCOSMOS_ADDRESS);
        const images = listings.filter((element:any) => !element.isPoll).map((element:any) => element.image);
        startPollTransition(contract, account, web3, ids, addresses, images);
    }


    useEffect(() => { 
        if(!active) return;
        const web3 = new Web3(library);
        let skyScraperContract = new library.eth.Contract(NFTCOSMOS_ABI as any, NFTCOSMOS_ADDRESS, account);
        let pollFactoryContract = new library.eth.Contract(NFTPOLLFACTORY_ABI as any, NFTPOLLFACTORY_ADDRESS, account);
        formatListings(skyScraperContract,pollFactoryContract,  account, web3).then((value) => {setListings(value)});
        console.log("set");
    },[active, account]);

    return (
        <div className="container mx-auto px-4 lg:px-2 pb-10">
            <div className="pt-10 pb-5 flex justify-between items-center">
            </div>
            {nonPolls ? (
                <>
                    {/* {nonHostedListings.length > 0 ? (
                            <div className="grid md:grid-cols-4 gap-7">
                                {nonHostedListings.map((listing: any, index: number) => {
                                    return (
                                        <ListingCard
                                            {...listing}
                                            onClick={() => {
                                                history.push(
                                                    `/listing/${listing.id}`
                                                );
                                            }}
                                        />
                                    );
                                })}
                            </div>
                    ) : (
                        <p className="text-xl text-center text-red-600">No listings</p>
                    )} */}


<div className="pt-16 pb-5 flex justify-between items-center">
                        <h1 className="text-red-600 text-2xl font-medium">
                            Polled Listing
                        </h1>
                    </div>
                    {nonPolls.length > 0 ? (
                        <div className="grid md:grid-cols-5 gap-8 ">
                            {nonPolls.map(
                                (listing: any, index: number) => {
                                    return (
                                        <ImageGrid
                                            {...listing}
                                            onClick={() => {
                                                history.push(
                                                    `/poll/${listing.id}`
                                                );
                                            }}
                                        />
                                    );
                                }
                            )}
                        </div>
                    ) : (
                        <p className="text-xl text-center text-red-600">
                            No listings
                        </p>
                    )}

                    <div className="pt-16 pb-5 flex justify-between items-center">
                        <h1 className="text-red-600 text-2xl font-medium">
                            Your Tokens
                        </h1>
                        <div className="flex items-center space-between">
                            <Button
                                text={"Create a token"}
                                onClick={() => setShowCreateListing(true)}
                            />
                            <div className="px-5" ></div>
                            <Button
                                text={"Start Poll"}
                                onClick={startPoll}
                            />
                        </div>
                    </div>
                    {polls.length > 0 ? (
                        <div className="grid md:grid-cols-5 gap-6">
                            {polls.map(
                                (listing: any, index: number) => {
                                    return (
                                        <ListingCard
                                            {...listing}
                                            onClick={() => {
                                                setModalListing(
                                                    listing
                                                );
                                                setShowManageListing(
                                                    false
                                                );
                                            }}
                                        />
                                    );
                                }
                            )}
                        </div>
                    ) : (
                        <p className="text-xl text-center text-red-600">
                            No listings
                        </p>
                    )}





                </>
            ) : false ? (
                <p className="text-xl text-center">Loading</p>
            ) : (
                <p className="text-xl text-center text-red-600">Connect wallet to proceed</p>
            )}
           <CreateListingModal
                {...{ showCreateListing, setShowCreateListing }}
            />
             {modalListing && (
                <ManageListingModal
                    {...{
                        modalListing,
                        showManageListing,
                        setShowManageListing,
                    }}
                />
            )}
        </div>
    );
};

export default Listings;
