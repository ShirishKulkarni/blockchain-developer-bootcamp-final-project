import React, { useEffect, useState } from "react";
import ContextContainer from "../functions/contextContainer";
import createListingTransition from "../functions/createListingTransition";
import Input from "./componentInput";
import Modal from "./componentModal";
import Tick from "./componentTick";
import { useWeb3React } from "@web3-react/core"
import { NFTCOSMOS_ABI, NFTCOSMOS_ADDRESS } from "../config";
import Web3 from 'web3'

type props = {
    showCreateListing: boolean;
    setShowCreateListing(visible: boolean): void;
};

const CreateListingModal: React.FC<props> = (props) => {
    const { showCreateListing, setShowCreateListing } = props;
    const [image, setImage] = useState<string | undefined>(undefined);
    const [royaltyType, setRoyaltyType] = useState<string>("1");
    const [royaltyValue, setRoyaltyValue] = useState<string>("0");
    const [price, setPriceValue] = useState<string>("0");
    let { library, active, account } = useWeb3React();

    const createListing = () => {
        if (
            !image
        )
            return;
        const web3 = new Web3(library);
        let contract = new library.eth.Contract(NFTCOSMOS_ABI as any, NFTCOSMOS_ADDRESS);
        createListingTransition(
            contract,
            image,
            royaltyType,
            royaltyValue,
            price,
            account,
            web3,
        );
    };

    useEffect(() => {
        setImage(undefined);
        setRoyaltyType("1");
        setRoyaltyValue("0");
        setPriceValue("0");
    }, [showCreateListing]);

    return (
        <Modal
            title="Post your Creation"
            visible={showCreateListing}
            setVisible={setShowCreateListing}
            buttonText={"Post!"}
            onClick={createListing}
        >
            <Input
                name="Image URL"
                value={image}
                type="text"
                setValue={setImage}
            />

        </Modal>
    );
};

export default CreateListingModal;
