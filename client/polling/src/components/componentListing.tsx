import React, { useEffect, useState } from "react";
import ContextContainer from "../functions/contextContainer";
import formatListings from "../functions/formatListings";
import getCurrentEpochNumber from "../functions/getCurrentEpochNumber";
import getCurrentUser from "../functions/getCurretUser";
import Button from "./componentButton";
import { useHistory, useParams } from "react-router-dom";
import bookListingTransition from "../functions/bookListingTransition";
import Input from "./componentInput";
import { useWeb3React } from "@web3-react/core"
import { NFTCOSMOS_ABI, NFTCOSMOS_ADDRESS } from "../config";
import Web3 from 'web3'
import { NFTPOLL_ABI } from "../config";


/*
Listing Component

This component presents a detailed view of the individual listings.
The description, rooms, amenities, map, etc are presented in a detailed manner.
Users can book the listing withing this component, which uses the makeReservation function.
The map embed url is built using the Google Plus Code and the Google Maps API Key.
*/

const Listing: React.FC = () => {
    const [listing, setListing] = useState<any | undefined>(undefined);
    const [web3, setWeb3] = useState<any | undefined>(undefined);
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const { contract } = ContextContainer.useContainer();
    let {
        library,
        active,
        account } = useWeb3React();


    useEffect(() => {
        if(!active)return;
        (async () => {
            const web3Ref = new Web3(library);
            setWeb3(web3Ref);
            let contract = new library.eth.Contract(NFTCOSMOS_ABI as any, NFTCOSMOS_ADDRESS, account);

            formatListings(contract,null, account, web3Ref, NFTPOLL_ABI, library).then((values) => {
                const listing = values.filter((listing) => {
                    return listing.id === id;
                })?.[0];
                if (!listing) history.push("/listings");
                setListing(listing);

            });  
        })();
    }, [active]);

    const buyItem = () => {
        const web3Ref = new Web3(library);
        let contract = new library.eth.Contract(NFTCOSMOS_ABI as any, NFTCOSMOS_ADDRESS, account);
         bookListingTransition(contract, web3Ref, listing.id, listing.price);
    };

    return (
        
        <>
            {listing ? (
                <div className="container mx-auto px-4 lg:px-2 pb-20">
                    <div className="pt-20 pb-10">
                        <h1 className="text-gray-900 text-3xl font-medium">
                        </h1>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-12 relative">
                        <div className="order-2 lg:order-none lg:col-span-2">
                            <img
                                className="rounded-xl bg-gray-100"
                                src={listing.image}
                            />
                        </div>

                        <div className="order-1">
                        <div className="text-center">
                                    <p className="mt-4 mb-8 text-xl text-red-600 font-medium">
                                        {listing.price} ETH
                                    </p>
                                </div>
                            <div className="sticky top-32 p-6 rounded-xl border-2 w-full">
                                <Button
                                    modal
                                    onClick={buyItem}
                                    text="Purchase"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : active ? (
                <p className="pt-20 text-xl text-center">Loading</p>
            ) : (
                <p className="pt-20 text-xl text-center">
                    Please connect ZilPay
                </p>
            )}
        </>
    );
};

export default Listing;
