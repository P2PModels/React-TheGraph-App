pragma solidity >=0.5.0;

contract EmployeeRegistry {
  event NewEmployee(uint id, address owner, string name, int age, string role, int salary);
  event UpdatedEmployee(uint id, address owner, string name, int age, string role, int salary);

  struct Employee {
    address owner;
    string name;
    int age;
    string role;
    int salary;
    
  }

  Employee[] public employees;
 
  
  mapping (uint => address) public employeeToOwner;
  mapping (address => uint) public ownerToEmployee;

  function createEmployee(string memory name, int age, string memory role, int salary) public {
    require(ownerToEmployee[msg.sender] == 0);
    employees.push(Employee(msg.sender, name, age, role, salary));
    uint id = employees.length-1;
    employeeToOwner[id] = msg.sender;
    ownerToEmployee[msg.sender] = id;
    
    emit NewEmployee(id, msg.sender, name, age, role, salary);
  }

  function getEmployee(address owner) public view returns (string memory, int, string memory, int) {
    uint id = ownerToEmployee[owner];
    return (employees[id].name, employees[id].age, employees[id].role, employees[id].salary);
  }

  function updateEmployeeName(string memory name) public {
    require(ownerToEmployee[msg.sender] != 0);
    require(msg.sender == employees[ownerToEmployee[msg.sender]].owner);

    uint id = ownerToEmployee[msg.sender];

    employees[id].name = name;
    emit UpdatedEmployee(id, msg.sender, name, employees[id].age, employees[id].role, employees[id].salary);
  }

  function updateEmployeeRole(string memory role) public {
    require(ownerToEmployee[msg.sender] != 0);
    require(msg.sender == employees[ownerToEmployee[msg.sender]].owner);

    uint id = ownerToEmployee[msg.sender];

    employees[id].role =  role;
    emit UpdatedEmployee(id, msg.sender, employees[id].name,employees[id].age, role, employees[id].salary);
  }
  function updateEmployeeAge(int age) public {
    require(ownerToEmployee[msg.sender] != 0);
    require(msg.sender == employees[ownerToEmployee[msg.sender]].owner);

    uint id = ownerToEmployee[msg.sender];

    employees[id].age =  age;
    emit UpdatedEmployee(id, msg.sender, employees[id].name,age, employees[id].role, employees[id].salary);
  }
  function updateEmployeeSalary(int salary) public {
    require(ownerToEmployee[msg.sender] != 0);
    require(msg.sender == employees[ownerToEmployee[msg.sender]].owner);

    uint id = ownerToEmployee[msg.sender];

    employees[id].salary =  salary;
    emit UpdatedEmployee(id, msg.sender, employees[id].name,employees[id].age, employees[id].role, salary);
  }

  // the gravatar at position 0 of gravatars[]
  // is fake
  // it's a mythical gravatar
  // that doesn't really exist
  // dani will invoke this function once when this contract is deployed
  // but then no more
  function setMythicalEmployee() public {
    require(msg.sender == 0x8d3e809Fbd258083a5Ba004a527159Da535c8abA);
    
    employees.push(Employee(0x0000000000000000000000000000000000000000, " ",0, " ",0));
  }
  function prueba() public{}
}