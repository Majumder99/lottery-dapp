import React, { useEffect, useState } from "react";

const Player = ({ state, address }) => {
  const [account, setAccount] = useState(null);
  const [registeredPlayers, setRegisteredPlayers] = useState([]);
  useEffect(() => {
    const handlePlayer = async () => {
      const { web3 } = state;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    state.web3 && handlePlayer();
  }, [state, state.web3]);

  useEffect(() => {
    const getPlayers = async () => {
      const { contract } = state;
      const players = await contract.methods.allPlayers().call();
      //   setRegisteredPlayers(players);
      const play = players.map((m) => m);
      console.log({ play });
      setRegisteredPlayers(play);
    };
    state.contract && getPlayers();
  }, [state, state.contract]);
  console.log(registeredPlayers);
  return (
    <>
      <div>Connected account: {account}</div>
      <p>Contract address : {address}</p>
      <div>
        Registered players:{" "}
        {registeredPlayers.length > 0 &&
          registeredPlayers.map((m) => <p key={m}>{m}</p>)}
      </div>
    </>
  );
};

export default Player;
