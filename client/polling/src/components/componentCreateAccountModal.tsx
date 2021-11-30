import React, { useEffect, useState } from "react";
import ContextContainer from "../functions/contextContainer";
import createUserTransition from "../functions/createUserTransition";
import Button from "./componentButton";
import Input from "./componentInput";
import Modal from "./componentModal";
import Tick from "./componentTick";
import { useWeb3React } from "@web3-react/core"
import { injected } from "../functions/injectedConnectors";



type props = {
    showSignUp: boolean;
    setShowSignUp(visible: boolean): void;
};

const SignUpModal: React.FC<props> = (props) => {
    const { active, account, library, connector, activate, deactivate } = useWeb3React();
    const {setAccount} = ContextContainer.useContainer();
    
    const { showSignUp, setShowSignUp } = props;
    const [name, setName] = useState<string | undefined>(undefined);
    const [userRole, setUserRole] = useState<string | undefined>("host");

    const createUser = async () => {
        const role = userRole === "host" ? "1" : "0";
    };


    async function connectToWallet() {
        try {
          await activate(injected)
        } catch (ex) {
          console.log(ex)
        }
      }

    useEffect(() => {
        setName(undefined);
        setUserRole("host");
    }, [
      
    ]);

    return (
        <div>
          <Modal
            title="Connect to Wallet"
            visible={showSignUp}
            setVisible={setShowSignUp}
            buttonText={"Connect"}
            onClick={connectToWallet}
        >
        </Modal>

        </div>
       
    );
};

export default SignUpModal;
