import getCallParameters from "./getCallParameters";
import toast from "react-hot-toast";
import transitionMessageAlert from "./transitionMessageAlert";
import { decodeZilPayError } from "./decodeMessage";

/* Calls claim_rent transition */

const startPollTransition = async (
    contract: any,
    account: any,
    web3: any,
    ids: any[],
) => {
    try {
        const accounts = await web3.eth.getAccounts();
        contract.methods.createNewPoll(5).send({from : accounts[0]}, function (err:any, res:any) {
            if (err) {
              console.log("An error occured", err)
              return
            }
            console.log(res);
          })
        
    } catch (error) {
        //toast.error(decodeZilPayError(error));
    }
};

export default startPollTransition;
