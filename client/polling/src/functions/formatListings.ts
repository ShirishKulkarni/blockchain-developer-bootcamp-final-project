

const formatListings = async (
    skyScraperContract: any,
    pollFactoryContract: any,
    account: any,
    web3: any
) => {
    let contractResponse = new Array();
    const accounts = await web3.eth.getAccounts();
    await skyScraperContract.methods.getTokenMetaList().call({ from: accounts[0] }, function (err: any, res: any) {
        if (err) {
            console.log("An error occured", err)
            return
        }
        res.forEach((element: any) => {
            if (element.uri) {
                contractResponse.push({
                    id: element.tokenId,
                    image: element.uri,
                    isPoll: false,
                })
            }
        });
    })
    await pollFactoryContract.methods.getAllOngoingPolls().call({ from: accounts[0] }, function (err: any, res: any) {
        if (err) {
            console.log("An error occured", err)
            return
        }
        res.forEach((element: any) => {
            contractResponse.push({
                id: element,
                isPoll: true,
                image:"https://news.miami.edu/_assets/images-stories/2020/09/voterpolling-hero-940x529.jpg"
            });
        });
    });

    return contractResponse;


}

export default formatListings;
