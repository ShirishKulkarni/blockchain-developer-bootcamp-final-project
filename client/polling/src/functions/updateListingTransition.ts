import getCallParameters from "./getCallParameters";
import toast from "react-hot-toast";
import transitionMessageAlert from "./transitionMessageAlert";
import { decodeZilPayError } from "./decodeMessage";

/* Calls update_listing transition */

const updateListingTransition = async (
    contract: any,
    web3: any,
    id: string | undefined,
    price: string | undefined,
    image: string | undefined,
) => {
    const convertedPrice = (parseInt(price || "") * 10 ** 12).toString();
    try {
       

        // transitionMessageAlert(zilPay, callTransition.ID, "Updating listing");
    } catch (error) {
        console.log(error);
    }
};

export default updateListingTransition;
