import { web3 } from "../lib/web3";
import { useState, useEffect } from "react";

const Tip = function ({ isLoggedIn, accounts, address }) {
  const send = function () {
    if (isLoggedIn) {
      window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: accounts[0],
            to: address,
            value: web3.utils.toHex(web3.utils.toWei("50", "ether")),
          },
        ],
      });
    } else {
      alert("not logged in");
    }
  };
  if (accounts[0] === address) {
    return null;
  }

  return (
    <button disabled={!isLoggedIn} onClick={send}>
      Tip 0.01 ETH
    </button>
  );
};

export default Tip;
