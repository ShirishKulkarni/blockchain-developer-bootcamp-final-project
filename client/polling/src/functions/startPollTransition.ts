import toast from "react-hot-toast";

const startPollTransition = async (
    contract: any,
    account: any,
    web3: any,
    ids: any[],
    addresses : any[],
    images: any[]
) => {
    try {
        const accounts = await web3.eth.getAccounts();
        contract.methods.createNewPoll(15, ids, addresses, images)
        .send({from : accounts[0]}) 
        .on('transactionHash', function(hash:any){
            toast.success("Request Submitted Successfully!");
        })
        .on('error', toast.error)
        .then(function(value:any){
            toast.success("Polling Started Successfully!");      
            window.location.href = "/listings";
        });
        
    } catch (error:any) {
        toast.error(error.message);
    }
};

export default startPollTransition;
