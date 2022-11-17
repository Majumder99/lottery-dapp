import React, { useEffect, useState } from "react";

const Manager = ({ state }) => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [winner, setWinner] = useState("No winner yet");
  const [reload, setReload] = useState(false);

  const reloadEffect = () => {
    setReload(!reload);
  };
  useEffect(() => {
    const getAccount = async () => {
      const { web3, contract } = state;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      console.log(accounts[0]);
    };
    state.web3 && getAccount();
  }, [state, state.web3, reload]);

  const handleAccount = async () => {
    const { web3, contract } = state;
    try {
      const balance = await contract.methods.getBalance().call({
        from: account,
      });
      setBalance(balance);
      console.log({ balance });
    } catch (error) {
      //   setBalance("You are not the manager");
      console.log(error);
    }
  };

  //whenever we are going to change the state of the blockchain we are going to use the send()
  //if state is not changing then we will use call()
  const handleWinner = async () => {
    const { web3, contract } = state;
    try {
      await contract.methods.setWinner().send({
        from: account,
      });
      const lotteryWinner = await contract.methods.winner().call();
      console.log({ lotteryWinner });
      setWinner(lotteryWinner);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>Nothing is here momoy</div>
      <div>
        <button
          onClick={reloadEffect}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Account
        </button>
        <div>{account}</div>
      </div>
      <div>
        <button
          onClick={handleAccount}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Balance
        </button>
        <div>{balance}</div>
      </div>

      <div>
        <button
          onClick={handleWinner}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Winner
        </button>
        <div>{winner}</div>
      </div>
    </>
  );
};

export default Manager;
