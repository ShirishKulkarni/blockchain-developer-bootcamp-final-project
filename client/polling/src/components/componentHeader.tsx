import React, { useEffect, useState } from "react";
import Button from "./componentButton";
import { useWeb3React } from "@web3-react/core"
import { injected } from "../functions/injectedConnectors";



const Header: React.FC = () => {
    const [searchString, setSearchString] = useState<string | undefined>(undefined);

    const { active, account, activate } = useWeb3React();

    async function connectToWallet() {
        try {
            await activate(injected);
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <header className="bg-red-700 sticky top-0 z-10 h-15">
            <div className="container mx-auto px-4 lg:px-2 py-3 flex justify-between items-center">
            <span
                    className="text-2xl font-bold cursor-pointer text-white"
                >
                    <b>
                Most Popular NFT
                </b>
            </span> 
                {active ?
                    (<b className="text-white font-small font-bolder text-sm">
                        {account}
                    </b>)
                    :
                    (
                        <Button 
                        text={"Wallet"}
                        onClick={connectToWallet}
                        header
                        red
                        />)}
            </div>
        </header>
    );
};

export default Header;
