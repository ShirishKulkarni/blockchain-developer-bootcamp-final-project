import toast from "react-hot-toast";

const getWinnersTransition = async (
    contract: any,
    account: any,
    web3: any,
    methodCallback: any,
) => {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.pollWinners().call({from : accounts[0]})                       
        .then(function(value:any){
            let contractResponse:any = [];
            value.forEach((element:any)  => {
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

export default getWinnersTransition;
