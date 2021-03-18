const Employee = artifacts.require("EmployeeRegistry");
var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(Employee);
  deployer.deploy(SimpleStorage);
};
