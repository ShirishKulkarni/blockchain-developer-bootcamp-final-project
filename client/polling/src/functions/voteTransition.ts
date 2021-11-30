import toast from "react-hot-toast";
const voteTransition = async (
    pollImagesContract: any,
    account: any,
    web3: any,
    address: string,
    id: any
) => {
    const accounts = await web3.eth.getAccounts();
    await pollImagesContract.methods.vote(address, id).send({ from: accounts[0] }, function (err: any, res: any) {
        if (err) {
            toast.error(err.message);
            return
        }
        toast.success(res);
        
    })

}

export default voteTransition;
