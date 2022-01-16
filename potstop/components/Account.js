import EthName from "./EthName";

const Account = function ({ connect, accounts, isLoggedIn }) {
  // TODO!!!
  // if already logged in, it should show
  // the EthName component with the correct address
  // if not logged in, show a connect button
  // that when its clicked, will prompt us to login
  // and store the info on the page
  if (isLoggedIn) {
    return <EthName address={accounts[0]} />;
  }
  return <button onClick={connect}>Connect</button>;
};

export default Account;
