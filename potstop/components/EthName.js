import { useState, useEffect } from "react";
import { web3 } from "../lib/web3";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import ENS, { getEnsAddress } from "@ensdomains/ensjs";

const ens = new ENS({
  provider: web3.currentProvider,
  ensAddress: getEnsAddress("1"),
});

const EnsName = function ({ address }) {
  const [ensName, setEnsName] = useState("");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    async function fetchEnsName() {
      try {
        const n = await ens.getName(
          "0xb25bf3990c5a274a758a2a3a4cc90b3e407eaaf4"
        );
        if (n.name) {
          setEnsName(n.name);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (address) {
      fetchEnsName();
    }
  }, [address]);
  useEffect(() => {
    async function fetchAvatar() {
      const n = await ens.name(ensName).getText("avatar");
      if (n) {
        setAvatar(n);
      }
    }
    if (ensName) {
      fetchAvatar();
    }
  }, [ensName]);
  const formattedAddress = `${address.substr(0, 5)}...${address.substr(-4)}`;
  return (
    <div className="eth-name">
      <div className="icon">
        {avatar ? (
          <img src={avatar} alt={ensName} />
        ) : (
          <Jazzicon diameter={32} seed={jsNumberForAddress(address)} />
        )}
      </div>

      <div className="name">
        <span className="primary">{ensName ? ensName : formattedAddress}</span>
        <span className="secondary">{ensName ? ensName : ""}</span>
      </div>
    </div>
  );
};

export default EnsName;
