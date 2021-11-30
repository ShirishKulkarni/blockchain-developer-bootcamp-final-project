
const pollImagesTransition = async (
    pollImagesContract: any,
    account: any,
    web3: any
) => {
    let contractResponse = new Array();
    const accounts = await web3.eth.getAccounts();
    await pollImagesContract.methods.getAllItemsInPoll().call({ from: accounts[0] }, function (err: any, res: any) {
        if (err) {
            console.log("An error occured", err)
            return
        }
        res.forEach((element: any) => {
                contractResponse.push({
                    id: element.tokenId,
                    image: element.uri,
                    address: element.address,
                })
        });
    })

    return contractResponse;

}

export default pollImagesTransition;
