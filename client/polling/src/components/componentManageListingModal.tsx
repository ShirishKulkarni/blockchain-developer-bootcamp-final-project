import React, { useEffect, useState } from "react";
import claimRentTransition from "../functions/claimRentTransition";
import ContextContainer from "../functions/contextContainer";
import deleteListingTransition from "../functions/deleteListingTransition";
import updateListingTransition from "../functions/updateListingTransition";
import setApproveTransition from "../functions/setApproveTransition";
import Button from "./componentButton";
import Input from "./componentInput";
import Modal from "./componentModal";
import { useWeb3React  } from "@web3-react/core"
import { NFTCOSMOS_ABI, NFTCOSMOS_ADDRESS } from "../config";
import Web3 from 'web3'

/*
ManageListingModal Component

This component presents a modal that can be used by a host user to manage their listing.
Uses Input and Button components.
deleteListing, updateListing and claimRent functions are called as required.
*/

type props = {
    modalListing: any;
    showManageListing: boolean;
    setShowManageListing(visible: boolean): void;
};

const ManageListingModal: React.FC<props> = (props) => {
    const { showManageListing, setShowManageListing, modalListing } = props;
    const { id, accumulated_rent } = modalListing;
    
    const [price, setPrice] = useState<string | undefined>(undefined);
    const [image, setImage] = useState<string | undefined>(undefined);
    const [web3, setWeb3] = useState<any | undefined>(undefined);
    const [contract, setContract] = useState<any | undefined>(undefined);
    const [buyerAddress, setBuyerAddress] = useState<string | undefined>(undefined);
    let {
        library,
        active,
        account} = useWeb3React();
       

        useEffect(() => {
            setPrice(modalListing.price);
            setImage(modalListing.image);
            const web3 = new Web3(library);
            setWeb3(web3);
            let contract = new library.eth.Contract(NFTCOSMOS_ABI as any, NFTCOSMOS_ADDRESS, account); 
            setContract(contract);       
        }, [showManageListing]);
        


    const updateListing = () => {
        if (
            !id ||
            !price ||
            !image
        )
            return;
        
        updateListingTransition(
            contract,
            web3,
            id,
            price,
            image,
        );
    };

    const deleteListing = () => {
        deleteListingTransition(contract, web3, id);
        setShowManageListing(false);
    };

    const setApprover = () => {
        setApproveTransition(contract, web3, id, buyerAddress);
        setShowManageListing(false);
    };

   
    return (
        <Modal
            title="Manage"
            visible={showManageListing}
            setVisible={setShowManageListing}
            buttonText={"Update Listing"}
            onClick={updateListing}
        >
            <>
                <h4 className="text-sm font-semibold text-gray-500 tracking-wide uppercase py-4">
                    Delete Listing
                </h4>
                <Button
                    text={"Delete Listing"}
                    onClick={deleteListing}
                    alert
                    padding
                    modal
                />
            </>
            
            <Input
                name="Price"
                unit="ETH"
                value={price}
                type="number"
                setValue={setPrice}
                disabled
            />
            <Input
                name="Image URL"
                value={image}
                type="text"
                setValue={setImage}
                disabled
            />
            <div className="flex grid md:grid-rows-1">
            <h4 className="text-sm font-semibold text-gray-500 tracking-wide uppercase py-4">
                    Auction
                </h4>      
            <div className="flex grid md:grid-cols-3 gap-7">    
            <Button
                    text={"Setup Auction"}
                    onClick={deleteListing}
                    auction
                    padding
                    modal
                />
                <Button
                    text={"Start Auction"}
                    onClick={deleteListing}
                    auction
                    padding
                    modal
                />
                <Button
                    text={"End Auction"}
                    onClick={deleteListing}
                    auction
                    padding
                    modal
                />
            </div>  
            </div>
            <Input
                name="Buyer Address"
                value={buyerAddress}
                type="text"
                setValue={setBuyerAddress}
            />
            <Button
                    text={"Approve Buyer"}
                    onClick={setApprover}
                    green = {true}
                    padding
                    modal
                />                  


            
        </Modal>
    );
};

export default ManageListingModal;
