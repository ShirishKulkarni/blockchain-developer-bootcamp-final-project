import { useState } from "react";
import { createContainer } from "unstated-next";

const useContext = () => {
   
    const [account, setAccount] = useState<any | undefined>(undefined);
    const [contract, setContract] = useState<any | undefined>(undefined);


    return {
        account,
        setAccount,
        contract,
        setContract
    };
};
const ContextContainer = createContainer(useContext);
export default ContextContainer;
