import getCallParameters from "./getCallParameters";
import toast from "react-hot-toast";
import transitionMessageAlert from "./transitionMessageAlert";
import { decodeZilPayError } from "./decodeMessage";

/* Calls delete_listing transition */

const deleteListingTransition = async (
    contract: any,
    web3: any,
    id: string | undefined
) => {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.burn(id).send({from : accounts[0]}, function (err:any, res:any) {
            if (err) {
              console.log("An error occured", err)
              return
            }
            console.log(res);
            });

        // transitionMessageAlert(zilPay, callTransition.ID, "Deleting listing");
    } catch (error) {
        // toast.error(decodeZilPayError(error));
    }
};

export default deleteListingTransition;
