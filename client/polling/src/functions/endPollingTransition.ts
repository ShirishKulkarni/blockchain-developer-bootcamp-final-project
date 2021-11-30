import toast from "react-hot-toast";

const endPollingTransition = async (
    contract: any,
    account: any,
    web3: any,
    methodCallback: any,
) => {
    try {
        const accounts = await web3.eth.getAccounts();
        contract.methods.endPolling().send({from : accounts[0]})
        .on('transactionHash', function(hash:any){
            toast.success("Request Submitted Successfully!");
        })
        .on('error', toast.error)
        .then(function(value:any){
            toast.success("Polling Completed Successfully!");
            let contractResponse:any = [];
            value.events.Winners.returnValues.winners.forEach((element:any)  => {
                contractResponse.push({
                        id: element.tokenId,
                        image: element.uri,
                        voteCount: element.voteCount,
                });
            });    
            methodCallback(contractResponse);       
        });
    } catch (error:any) {
        toast.error(error.message);
    }
};

export default endPollingTransition;
