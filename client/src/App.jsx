import { useState, useEffect } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import Lottery from "../../contract/build/contracts/Lottery.json";

const App = () => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        provider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(
          Lottery.abi,
          Lottery.networks[5777].address
        );
        setState({
          web3,
          contract,
        });
      } else {
        console.error("Please install MetaMask!");
      }
    };
    loadProvider();
  }, []);
  console.log(Lottery.networks[5777].address);
  return (
    <>
      <div>Hello world</div>
    </>
  );
};

export default App;
