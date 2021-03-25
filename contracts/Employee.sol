pragma solidity >=0.5.0;

contract EmployeeContract {
  event NewEmployee(uint id, string name, int age, string role, int salary);
  event UpdatedEmployee(uint id, string name, int age, string role, int salary);
  event DeleteEmployee(uint id);

  struct Employee {
    string name;
    int age;
    string role;
    int salary;
  }

  mapping (uint => Employee) public employees;
  uint employeesLength;
  address manager;
  
  mapping (uint => address) public employeeToOwner;
  mapping (address => uint) public ownerToEmployee;
    constructor() public{
         employeesLength = 0;
         manager = 0x59BDe5BBA8549503D88EBE11FE47b39989Dda3a9;
    }
    
    modifier onlyOwner() {
        require(manager == msg.sender);
        _;
    }
  function createEmployee(string memory name, int age, string memory role, int salary) onlyOwner public {
    employees[employeesLength]  = Employee(name, age, role, salary);
    employeesLength++;
    
    emit NewEmployee(employeesLength - 1 , name, age, role, salary);
  }

  function getEmployee(uint id) public view returns (string memory, int, string memory, int) {
    return (employees[id].name, employees[id].age, employees[id].role, employees[id].salary);
  }

  function updateEmployeeName(uint id, string memory name, int age, string memory role, int salary) onlyOwner public {
    employees[id].name = name;
    employees[id].age =  age;
    employees[id].role =  role;
    employees[id].salary =  salary;
    emit UpdatedEmployee(id, name, age, role, salary);
  }

  function deleteEmployee(uint id) onlyOwner public {
       for (uint j = id; j < employeesLength - 1; j++){
                employees[j] = employees[j+1];
            }
      delete employees[employeesLength-1];
      employeesLength--;
      emit DeleteEmployee(id);
  }
}