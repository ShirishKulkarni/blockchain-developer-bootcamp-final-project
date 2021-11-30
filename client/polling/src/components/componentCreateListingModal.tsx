import React, { useEffect, useState } from "react";
import ContextContainer from "../functions/contextContainer";
import createListingTransition from "../functions/createListingTransition";
import Input from "./componentInput";
import Modal from "./componentModal";
import Tick from "./componentTick";
import { useWeb3React  } from "@web3-react/core"
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
    let {library, active, account} = useWeb3React();

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
            <div className="flex gap-12 mb-8">
                 <div
                        className="flex justify-center items-center cursor-pointer"
                        onClick={() => setRoyaltyType("1")}
                    >
                        <p className="text-lg text-gray-800 pr-4">No Royalty</p>
                        <div
                            className={`p-1 bg-gray-200 rounded-lg w-8 h-8 hover:scale-95 transform transition-all 
                            ${
                                royaltyType == "1" ? "" : "hover:bg-gray-300"
                            }`}
                        >
                            <div
                                className={`w-full h-full rounded transition-colors text-transparent ${
                                    royaltyType == "1" ? "" : "hover:bg-gray-300"
                                }`}
                            >
                                {royaltyType === "1" && <Tick />}
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex justify-center items-center cursor-pointer"
                        onClick={() => setRoyaltyType("2")}
                    >
                        <p className="text-lg text-gray-800 pr-4">Creator Royalty</p>
                        <div
                            className={`p-1 bg-gray-200 rounded-lg w-8 h-8 hover:scale-95 transform transition-all ${
                                royaltyType == "2" ? "" : "hover:bg-gray-300"
                            }`}
                        >
                            <div
                                className={`w-full h-full rounded transition-colors text-transparent ${
                                    royaltyType == "2"
                                        ? "bg-gray-900 text-gray-200"
                                        : ""
                                }`}
                            >
                                {royaltyType === "2" && <Tick />}
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex justify-center items-center cursor-pointer"
                        onClick={() => setRoyaltyType("3")}
                    >
                        <p className="text-lg text-gray-800 pr-4">Chained Royalty</p>
                        <div
                            className={`p-1 bg-gray-200 rounded-lg w-8 h-8 hover:scale-95 transform transition-all ${
                                royaltyType == "3" ? "" : "hover:bg-gray-300"
                            }`}
                        >
                            <div
                                className={`w-full h-full rounded transition-colors text-transparent ${
                                    royaltyType == "3"
                                        ? "bg-gray-900 text-gray-200"
                                        : ""
                                }`}
                            >
                                {royaltyType === "3" && <Tick />}
                            </div>
                        </div>
                    </div>
                </div>


            <Input
                name="Royalty Percent"
                value={royaltyValue}
                type="number"
                setValue={setRoyaltyValue}
            />  

            <Input
                name="Price"
                value={price}
                type="number"
                setValue={setPriceValue}
            />    
        </Modal>
    );
};

export default CreateListingModal;
