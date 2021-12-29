import React, { useEffect, useState } from "react";
import Header from "./components/componentHeader";
import Listing from "./components/componentListing";
import Listings from "./components/componentListings";
import SignUpModal from "./components/componentCreateAccountModal";
import ContextContainer from "./functions/contextContainer";
import { Toaster } from "react-hot-toast";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import Poll from './components/componentPoll';
import { useWeb3React,  } from "@web3-react/core";
import detectEthereumProvider from '@metamask/detect-provider'
import { InjectedConnector } from '@web3-react/injected-connector'
declare let window: any;



const App: React.FC = () => {
    const { setContract } = ContextContainer.useContainer();
    let {
        library,
        active,
        account,
        activate} = useWeb3React();

    useEffect(() => {
        if (window.ethereum) {
            activate(new InjectedConnector({
                supportedChainIds: [3],
              }));
         }
    },[]);


    return (
            <div className="rentonzilliqa">
                <Header />
                <div><Router>
                    <main>
                        <Switch>
                            <Route path="/" exact>
                                <Redirect to={"/listings"} />
                            </Route>
                            <Route path="/listings">
                                <Listings />
                            </Route>
                            <Route path="/listing/:id">
                                <Listing />
                            </Route>
                            <Route path="/poll/:id/:isActive">
                                <Poll />
                            </Route>
                            <Redirect to={"/listings"} />
                        </Switch>
                    </main>
                </Router>
                <Toaster
                    toastOptions={{
                        success: { duration: 6000 },
                        error: { duration: 8000 },
                        loading: { duration: 130000 },
                    }}
                />
                </div>
            </div>
    );
};

export default App;
