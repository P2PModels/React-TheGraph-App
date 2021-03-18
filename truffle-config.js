const path = require("path");
var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey = "v3/c29e1033df68428bb364f9409f13f44c";
var mnemonic = "venue silk dirt toward mail wife hunt garbage olive actor actor squeeze";
module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "0.0.0.0",
      port: 8545,
      network_id: "5777",
    },
    
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey),
      network_id: 3
    }
  }
};
