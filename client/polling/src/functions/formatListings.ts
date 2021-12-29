import Web3 from 'web3'

const formatListings = async (
    monumentContract: any,
    pollFactoryContract: any,
    account: any,
    web3: any,
    nftPollAbi: any,
    library: any,
) => {
    let contractResponse = new Array();
    let nftPollArray = new Array();
    const accounts = await web3.eth.getAccounts();
    await monumentContract.methods.getTokenMetaList().call({ from: accounts[0] }, function (err: any, res: any) {
        if (err) {
            console.log("An error occured", err)
            return
        }
        res.forEach((element: any) => {
            console.log(element);
            if (element.uri) {
                contractResponse.push({
                    id: element.tokenId,
                    image: element.uri,
                    isPoll: false,
                    isActive: false,
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
            nftPollArray.push({address:element});
        });


            //             contractResponse.push({
            //                 id: element,
            //                 isPoll: true,
            //                 image:"https://news.miami.edu/_assets/images-stories/2020/09/voterpolling-hero-940x529.jpg"
            //             });
            //         });


        });
      
         for(let addr in nftPollArray){
            const contractAddress = nftPollArray[addr].address;
            let pollContract = new library.eth.Contract(nftPollAbi as any, contractAddress as any, account);
            await pollContract.methods.isVotingComplete().call((err:any, res:any) => {
                contractResponse.push({
                    id: contractAddress,
                    isPoll: true,
                    image:"https://news.miami.edu/_assets/images-stories/2020/09/voterpolling-hero-940x529.jpg",
                    isActive: !res,
                    });

            });

         }   

    return contractResponse;


}

export default formatListings;
