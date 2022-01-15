const web3 = new Web3(Web3.givenProvider);

const form = document.querySelector("form");

if (window.ethereum) {
  form.classList.add("has-eth");
}

const submit = async (amount) => {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length > 0) {
      const hexAmount = web3.utils.toHex(web3.utils.toWei(amount, "ether"));
      window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: accounts[0],
            to: "0x633bB55F33c891d9cf7b63F46Fd795B189ffdF26",
            value: hexAmount,
          },
        ],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (window.ethereum) {
    const value = form.querySelector("input").value;
    submit(value);
  } else {
    alert("no wallets found");
  }
});
