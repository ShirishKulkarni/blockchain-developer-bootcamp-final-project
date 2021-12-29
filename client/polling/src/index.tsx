import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./tailwind.output.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ContextContainer from "./functions/contextContainer";
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

function getLibrary(provider: any) {
    let webProvider = new Web3(provider);
    return webProvider;
}

ReactDOM.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <ContextContainer.Provider>
                <App />
            </ContextContainer.Provider>
        </Web3ReactProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
