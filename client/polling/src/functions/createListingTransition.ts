import getCallParameters from "./getCallParameters";
import toast from "react-hot-toast";
import transitionMessageAlert from "./transitionMessageAlert";
import { decodeZilPayError } from "./decodeMessage";
import getCurrentUser from "../functions/getCurretUser";
import Web3 from "web3";

/* Calls create_listing transition */

const createListingTransition = async (
    contract: any,
    image: string | undefined,
    royaltyType: string,
    royaltyValue: string,
    price: string,
    account: any,
    web3: any
) => {
        let accounts = await web3.eth.getAccounts();
        await contract.methods.safeMint(
                account as any,
                image as any,
                royaltyType as any,
                royaltyValue as any,
                price as any
            ).send({from:accounts[0]}, function (err:any, res:any) {
                if (err) {
                  console.log("An error occured", err)
                  return
                }
                console.log(res);
                });
};

export default createListingTransition;
