import toast from "react-hot-toast";
import { decodeZilPayError } from "./decodeMessage";
import getCallParameters from "./getCallParameters";
import transitionMessageAlert from "./transitionMessageAlert";
import getCurrentUser from "../functions/getCurretUser";

/* Calls book_listing transition */

const bookListingTransition = async (
    contract: any,
    web3: any,
    id: string,
    amount: number
) => {
    try {
        const accounts = await web3.eth.getAccounts();
        contract.methods.buy(id).send({from:accounts[0], value:5000000000000000}, function (err:any, res:any) {
            if (err) {
              console.log("An error occured", err)
              return
            }
            console.log(res);
          });
        
        
        //transitionMessageAlert(zilPay, callTransition.ID, "Purchasing");
    } catch (error) {
        //toast.error(decodeZilPayError(error));
    }
};

export default bookListingTransition;
